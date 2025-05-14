"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_model_1 = __importDefault(require("../models/Course.model"));
const review_controller_1 = require("../controllers/review.controller");
jest.mock('../models/Course.model');
describe('GET /courses', () => {
    const mockRequest = {};
    let mockResponse;
    beforeEach(() => {
        jest.clearAllMocks();
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    it('should handle errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
        ;
        Course_model_1.default.findAll.mockRejectedValue(new Error('DB error'));
        yield (0, review_controller_1.getAllCourses)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            code: 500,
            message: 'Error fetching courses',
            data: { error: expect.any(Error) },
        });
    }));
    it('should return course list with 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCourses = [
            { id: '1', title: 'Course A' },
            { id: '2', title: 'Course B' },
        ];
        Course_model_1.default.findAll.mockResolvedValue(mockCourses);
        yield (0, review_controller_1.getAllCourses)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            code: 200,
            message: 'courses retrieved successfully',
            data: mockCourses,
        });
    }));
    it('should call Course.findAll once', () => __awaiter(void 0, void 0, void 0, function* () {
        ;
        Course_model_1.default.findAll.mockResolvedValue([]);
        yield (0, review_controller_1.getAllCourses)(mockRequest, mockResponse);
        expect(Course_model_1.default.findAll).toHaveBeenCalledTimes(1);
    }));
    it('should return empty array if no course found', () => __awaiter(void 0, void 0, void 0, function* () {
        ;
        Course_model_1.default.findAll.mockResolvedValue([]);
        yield (0, review_controller_1.getAllCourses)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            code: 200,
            message: 'courses retrieved successfully',
            data: [],
        });
    }));
});
