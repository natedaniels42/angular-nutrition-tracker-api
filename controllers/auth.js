var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var db = require('../models');
require('dotenv').config();
var passwordValid = function (password) {
    return /[a-z]/.test(password)
        && /[A-Z]/.test(password)
        && /\d/.test(password)
        && /[!@#\$%\^&\*\(\)]/.test(password);
};
var emailValid = function (email) {
    return /^\w+@\w+\.\w+$/.test(email);
};
var register = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var foundUser, salt, hash, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name || !req.body.email
                    || !req.body.password || !req.body.dailyCalorieGoal
                    || !req.body.dailyCarbGoal || !req.body.dailyFatGoal
                    || !req.body.dailyProteinGoal) {
                    return [2 /*return*/, res.status(400).json({ message: 'All fields are required' })];
                }
                if (req.body.password.length < 8 || req.body.password.length > 16) {
                    return [2 /*return*/, res.status(400).json({ message: 'Password must be between 8 and 16 characters long' })];
                }
                if (!passwordValid(req.body.password)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character(!@#$%^&*())' })];
                }
                if (!emailValid(req.body.email)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email must be valid' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, db.User.findOne({ email: req.body.email })];
            case 2:
                foundUser = _a.sent();
                if (foundUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email address is already registered' })];
                }
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 3:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt.hash(req.body.password, salt)];
            case 4:
                hash = _a.sent();
                return [4 /*yield*/, db.User.create(__assign(__assign({}, req.body), { password: hash }))];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(201).json({ message: 'Success' })];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({ message: 'Something went wrong' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var foundUser, isMatch, payload, secret, expiration, token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db.User.findOne({ email: req.body.email })];
            case 1:
                foundUser = _a.sent();
                if (!foundUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email or password is incorrect' })];
                }
                return [4 /*yield*/, bcrypt.compare(req.body.password, foundUser.password)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json({ message: 'Email or password is incorrect' })];
                }
                payload = { id: foundUser._id };
                secret = process.env.JWT_SECRET;
                expiration = { expiresIn: '1hr' };
                token = jwt.sign(payload, secret, expiration);
                res.status(200).json({ token: token });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json({ message: 'Something went wrong' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    register: register,
    login: login
};
