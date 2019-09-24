import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CourseForm from './CourseForm'
import { loadCourses, saveCourse } from '../../actions/courseActions'
import { loadAuthors } from '../../actions/authorsActions'
import { newCourse } from '../../../mockServer/mockData'
import Spinner from '../common/Spinner'

const getCourseBySlug = (courses, slug) =>
  courses.find(course => course.slug === slug) || null

export const ManageCoursePage = ({ // export for tests
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course })
  const [errors, setErrors] = useState({})
  console.log(setErrors)

  useEffect(() => {
    if (!courses.length) {
      loadCourses().catch(error => {
        console.log('loading courses failed ' + error)
      })
    } else {
      setCourse({ ...props.course })
    }
    if (!authors.length) {
      loadAuthors().catch(error => {
        console.log('loading authors failed ' + error)
      })
    }
  }, [props.course])

  const handleChange = event => {
    const { name, value } = event.target
    setCourse(prev => ({
      ...prev,
      [name]: name === 'authorId' ? Number(value) : value
    }))
  }

  const handleSave = event => {
    event.preventDefault()
    saveCourse(course).then(() => {
      history.push('/courses')
    })
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  )
}

ManageCoursePage.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse
  return {
    course,
    courses: state.courses,
    authors: state.authors
  }
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage)
