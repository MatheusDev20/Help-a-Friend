"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResetPasswordController = exports.makeForgotPasswordController = exports.makeUserProfile = exports.makeAvatarUpload = exports.makeAuthUserController = exports.makeDeleteUserController = exports.makeSignUpUserController = void 0;
const nodemailer_1 = require("../../infra/mail/nodemailer");
const reset_password_controller_1 = require("../../presentation/controllers/auth/reset-password-controller");
const reset_password_use_case_1 = require("../../data/auth/reset-password-use-case");
const forgot_password_token_repository_1 = require("../../infra/db/postgres/repositories/forgot-password-token-repository");
const jwt_adapter_1 = require("../../infra/criptography/jwt-adapter");
const forgot_password_controller_1 = require("../../presentation/controllers/auth/forgot-password-controller");
const forgot_password_usecase_1 = require("../../data/auth/forgot-password-usecase");
const update_user_avatar_usecase_1 = __importDefault(require("../../data/users/usecases/update-user-avatar-usecase"));
const S3_1 = __importDefault(require("../../infra/storage/S3"));
const update_user_avatar_controller_1 = __importDefault(require("../../presentation/controllers/users/update-user-avatar-controller"));
const login_usecase_1 = __importDefault(require("../../data/auth/login-usecase"));
const login_controller_1 = __importDefault(require("../../presentation/controllers/auth/login-controller"));
const delete_user_controller_1 = __importDefault(require("../../presentation/controllers/users/delete-user-controller"));
const delete_user_usecase_1 = __importDefault(require("../../data/users/usecases/delete-user-usecase"));
const register_new_user_controller_1 = __importDefault(require("../../presentation/controllers/users/register-new-user-controller"));
const user_repository_1 = __importDefault(require("../../infra/db/postgres/repositories/user-repository"));
const add_user_usecase_1 = __importDefault(require("../../data/users/usecases/add-user-usecase"));
const get_user_profile_1 = __importDefault(require("../../presentation/controllers/users/get-user-profile"));
const get_user_profile_2 = __importDefault(require("../../data/users/usecases/get-user-profile"));
const makeSignUpUserController = () => {
    const userRepository = new user_repository_1.default();
    const createUserUseCase = new add_user_usecase_1.default(userRepository);
    const registerUserConroller = new register_new_user_controller_1.default(createUserUseCase);
    return registerUserConroller;
};
exports.makeSignUpUserController = makeSignUpUserController;
const makeDeleteUserController = () => {
    const userRepository = new user_repository_1.default();
    const deleteUserUseCase = new delete_user_usecase_1.default(userRepository);
    const deleteUserController = new delete_user_controller_1.default(deleteUserUseCase);
    return deleteUserController;
};
exports.makeDeleteUserController = makeDeleteUserController;
const makeAuthUserController = () => {
    const usersRepository = new user_repository_1.default();
    const generateJwt = new jwt_adapter_1.JwtAdapter();
    const authorizationUseCase = new login_usecase_1.default(usersRepository, generateJwt);
    const authController = new login_controller_1.default(authorizationUseCase);
    return authController;
};
exports.makeAuthUserController = makeAuthUserController;
const makeAvatarUpload = () => {
    const usersRepository = new user_repository_1.default();
    const storage = new S3_1.default();
    const updateAvatarUseCase = new update_user_avatar_usecase_1.default(usersRepository, storage);
    const updateAvatarController = new update_user_avatar_controller_1.default(updateAvatarUseCase);
    return updateAvatarController;
};
exports.makeAvatarUpload = makeAvatarUpload;
const makeUserProfile = () => {
    const usersRepository = new user_repository_1.default();
    const getProfileUseCase = new get_user_profile_2.default(usersRepository);
    const getProfileController = new get_user_profile_1.default(getProfileUseCase);
    return getProfileController;
};
exports.makeUserProfile = makeUserProfile;
const makeForgotPasswordController = () => {
    const encrypter = new jwt_adapter_1.JwtAdapter();
    const mailService = new nodemailer_1.Nodemailer();
    const forgotPasswordRepository = new forgot_password_token_repository_1.ForgotPasswordTokenRepository();
    const usersRepository = new user_repository_1.default();
    const forgotPasswordUseCase = new forgot_password_usecase_1.ForgotPasswordUseCase(encrypter, forgotPasswordRepository, mailService, usersRepository);
    const forgotPasswordController = new forgot_password_controller_1.ForgotPasswordController(forgotPasswordUseCase);
    return forgotPasswordController;
};
exports.makeForgotPasswordController = makeForgotPasswordController;
const makeResetPasswordController = () => {
    const verifyToken = new jwt_adapter_1.JwtAdapter();
    const usersRepository = new user_repository_1.default();
    const forgotPasswordRepository = new forgot_password_token_repository_1.ForgotPasswordTokenRepository();
    const resetPasswordUseCase = new reset_password_use_case_1.ResetPasswordUseCase(verifyToken, usersRepository, forgotPasswordRepository);
    const resetPasswordController = new reset_password_controller_1.ResetPasswordController(resetPasswordUseCase);
    return resetPasswordController;
};
exports.makeResetPasswordController = makeResetPasswordController;
