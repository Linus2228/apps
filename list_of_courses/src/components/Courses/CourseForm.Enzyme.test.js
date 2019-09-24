// we don't have to include 'Snapshots' in file name
import React from 'react'
import CourseForm from './CourseForm'
import { shallow } from 'enzyme'
import "../../../tools/testSetup"
// shallow renders single component
// mount renders component with children

const renderCourseForm = args => {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  }

  const props = { ...defaultProps, ...args }
  return shallow(<CourseForm {...props} />)
}

it('renders form and header', () => {
  const wrapper = renderCourseForm()
  // console.log(wrapper.debug())
  expect(wrapper.find('form').length).toBe(1)
  expect(wrapper.find('h2').text()).toEqual('Add Course')
})

it('labels save buttons as "Save" when saving is false', () => {
  const wrapper = renderCourseForm()
  expect(wrapper.find('button').text()).toBe('Save')
})

it('lables save buttons as "Saving..." when saving is true', () => {
  const wrapper = renderCourseForm({saving: true})
  expect(wrapper.find('button').text()).toBe('Saving...')
})
