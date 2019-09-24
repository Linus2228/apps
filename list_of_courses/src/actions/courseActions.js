import * as types from '../constants/actionTypes'
import * as courseApi from '../api/courseApi'
import { beginApiCall } from './apiStatusActions'

export const createCourseSuccess = course => ({
  type: types.CREATE_COURSE_SUCCESS,
  course
})

const loadCoursesSuccess = courses => ({
  type: types.LOAD_COURSES_SUCCESS,
  courses
})

export const loadCourses = () => dispatch => {
  dispatch(beginApiCall())
  return courseApi
    .getCourses()
    .then(courses => {
      dispatch(loadCoursesSuccess(courses))
    })
    .catch(error => {
      throw error
    })
}

export const updateCoursesSuccess = course => ({
  type: types.UPDATE_COURSE_SUCCESS,
  course
})

export const saveCourse = course => dispatch => {
  dispatch(beginApiCall())
  return courseApi
    .saveCourse(course)
    .then(savedCourse => {
      course.id
        ? dispatch(updateCoursesSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse))
    })
    .catch(error => {
      throw error
    })
}

export const deleteCourseOptimistic = id => ({
  type: types.DELETE_COURSE_OPTIMISTIC, id
})

export const deleteCourse = id => dispatch => {
  dispatch(deleteCourseOptimistic(id))
  return courseApi.deleteCourse(id)
}