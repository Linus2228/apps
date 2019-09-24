import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import * as courseActions from '../../actions/courseActions'
import * as authorsActions from '../../actions/authorsActions'
import Spinner from '../common/Spinner'
import CourseList from './CourseList'
import { toast } from 'react-toastify'
class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  }
  componentDidMount() {
    const { courses, authors } = this.props
    if (!courses.length) {
      this.props.loadCourses().catch(error => {
        console.log('loading courses failed ' + error)
      })
    }
    if (!authors.length) {
      this.props.loadAuthors().catch(error => {
        console.log('loading authors failed ' + error)
      })
    }
  }

  handleDeleteCourse = async id => {
    toast.success('Course deleted')
    try {
      await this.props.deleteCourse(id)
    } catch (error) {
      toast.error('Delete failed. ' + error.message, { autoClose: false })
    }
  }

  render() {
    const { courses, authors, loading } = this.props
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ margin: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={courses}
              authors={authors}
              deleteCourse={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    )
  }
}

CoursesPage.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  courses: state.authors.length
    ? state.courses.map(course => ({
        ...course,
        authorName: state.authors.find(author => author.id === course.authorId)
          .name
      }))
    : [],
  authors: state.authors,
  loading: state.apiCallsInProgress > 0
})

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorsActions.loadAuthors,
  deleteCourse: courseActions.deleteCourse
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage)
