"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResourceOptions = void 0;
const userResourceOptions = {
    navigation: 'Admin',
    properties: {
        birth: {
            type: 'date',
        },
        password: {
            type: 'password',
        },
        role: {
            availableValues: [
                { value: 'admin', label: 'Administrator' },
                { value: 'user', label: 'Standard User' },
            ],
        },
    },
    editProperties: [
        'firstName',
        'lastName',
        'phone',
        'birth',
        'email',
        'password',
        'role',
    ],
    filterProperties: [
        'firstName',
        'lastName',
        'phone',
        'birth',
        'email',
        'role',
        'createdAt',
        'updatedAt',
    ],
    listProperties: [
        'id',
        'firstName',
        'email',
        'role',
        'createdAt',
        'updatedAt',
        'deletedAt',
    ],
    showProperties: [
        'id',
        'firstName',
        'lastName',
        'phone',
        'birth',
        'email',
        'role',
        'createdAt',
        'updatedAt',
    ],
};
exports.userResourceOptions = userResourceOptions;
