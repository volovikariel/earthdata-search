import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AdvancedSearchForm from './AdvancedSearchForm'
import EDSCModal from '../EDSCModal/EDSCModal'

import './AdvancedSearchModal.scss'

/**
 * Renders AdvancedSearchModal.
 * @param {Object} props - The props passed into the component.
 * @param {Object} props.advancedSearch - The collections.
 * @param {Boolean} props.isOpen - The modal state.
 * @param {Object} props.fields - The advanced search fields.
 * @param {Object} props.errors - Form errors provided by Formik.
 * @param {Function} props.handleBlur - Callback function provided by Formik.
 * @param {Function} props.handleChange - Callback function provided by Formik.
 * @param {Function} props.handleSubmit - Callback function provided by Formik.
 * @param {Boolean} props.isValid - Flag provided from Formik.
 * @param {Function} props.onToggleAdvancedSearchModal - Callback function close the modal.
 * @param {Function} props.resetForm - Callback function provided by Formik.
 * @param {Function} props.setFieldValue - Callback function provided by Formik.
 * @param {Function} props.setFieldTouched - Callback function provided by Formik.
 * @param {Object} props.touched - Form state provided by Formik.
 * @param {Object} props.values - Form values provided by Formik.
 */
export class AdvancedSearchModal extends Component {
  constructor(props) {
    super(props)

    this.onApplyClick = this.onApplyClick.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
  }

  onApplyClick(e) {
    const {
      handleSubmit,
      onToggleAdvancedSearchModal
    } = this.props

    handleSubmit(e)
    onToggleAdvancedSearchModal(false)
  }

  onCancelClick() {
    this.resetAndClose()
  }

  onModalClose() {
    this.resetAndClose()
  }

  resetAndClose() {
    const {
      onToggleAdvancedSearchModal,
      resetForm
    } = this.props

    resetForm()
    onToggleAdvancedSearchModal(false)
  }

  render() {
    const {
      advancedSearch,
      fields,
      isOpen,
      errors,
      handleBlur,
      handleChange,
      isValid,
      setFieldValue,
      setFieldTouched,
      touched,
      values
    } = this.props

    const body = (
      <AdvancedSearchForm
        advancedSearch={advancedSearch}
        fields={fields}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        isValid={isValid}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        touched={touched}
        values={values}
      />
    )

    return (
      <EDSCModal
        className="advanced-search-modal"
        title="Advanced Search"
        isOpen={isOpen}
        id="advanced-search"
        size="lg"
        fixedHeight
        onClose={this.onModalClose}
        body={body}
        primaryAction="Apply"
        primaryActionDisabled={!isValid}
        onPrimaryAction={this.onApplyClick}
        secondaryAction="Cancel"
        onSecondaryAction={this.onCancelClick}
      />
    )
  }
}

AdvancedSearchModal.propTypes = {
  advancedSearch: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  errors: PropTypes.shape({}).isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  touched: PropTypes.shape({}).isRequired,
  values: PropTypes.shape({}).isRequired,
  onToggleAdvancedSearchModal: PropTypes.func.isRequired
}

export default AdvancedSearchModal
