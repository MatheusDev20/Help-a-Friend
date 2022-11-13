"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserProfile = exports.makeAvatarUpload = exports.makeAuthUserController = exports.makeDeleteUserController = exports.makeSignUpUserController = void 0;
const update_user_avatar_usecase_1 = __importDefault(require("../../data/users/usecases/update-user-avatar-usecase"));
const S3_1 = __importDefault(require("../../infra/storage/S3"));
const update_user_avatar_controller_1 = __importDefault(require("../../presentation/controllers/users/update-user-avatar-controller"));
const auth_user_usecase_1 = __importDefault(require("../../data/users/usecases/auth-user-usecase"));
const auth_user_controller_1 = __importDefault(require("../../presentation/controllers/auth/auth-user-controller"));
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
    const authorizationUseCase = new auth_user_usecase_1.default(usersRepository);
    const authController = new auth_user_controller_1.default(authorizationUseCase);
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
