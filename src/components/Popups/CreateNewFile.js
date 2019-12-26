import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toggleModal } from '../../actions';
import { createFile } from '../../actions';
import './CreateNewFile.scss';
import closeIcon from './../../assets/icons/close.svg';
import Switch from '../Switch';
import Input from '../Input';
import uuid from 'uuid/v4';

const CreateNewFile = props => {
  const [selectedTypeCreation, setSelectedTypeCreation] = useState();
  const initialValues = {
    name: '',
    author: '',
    size: '',
    date: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Please enter a name of atleast 3 characters')
      .required('file name is required'),
    author: Yup.string().required('author name is required'),
    size: Yup.number()
      .positive()
      .required('size is required and should be a number'),
    date: Yup.string().required('date is required'),
  });

  const handleFormSubmit = values => {
    const extension = values.name.split('.')[1];
    props.createFileLocal({
      ...values,
      type: selectedTypeCreation,
      parentID: props.currentPath.pathId,
      parentPath: props.currentPath.pathname,
      extension,
      id: uuid(),
      path: `${
        props.currentPath.pathname === '/' ? '' : props.currentPath.pathname
      }/${values.name}`,
    });
    props.toggleModalLocal(false);
  };

  return (
    <div className="create-new-file">
      <p className="create-new-file-title">Create New</p>
      <Switch selectedType={setSelectedTypeCreation} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          isValid,
          touched,
          handleChange,
          values,
          errors,
          handleSubmit,
          handleBlur,
        }) => {
          return (
            <>
              <Input
                placeholder="Name"
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                value={values.name}
                error={touched.name && errors.name}
                onBlur={handleBlur}
              />
              <Input
                placeholder="author"
                id="author"
                type="text"
                name="author"
                onChange={handleChange}
                value={values.author}
                error={touched.author && errors.author}
                onBlur={handleBlur}
              />
              <Input
                placeholder="Size"
                id="size"
                name="size"
                type="number"
                onChange={handleChange}
                value={values.size}
                error={touched.size && errors.size}
                onBlur={handleBlur}
              />
              <Input
                placeholder="Date"
                id="date"
                name="date"
                type="date"
                onChange={handleChange}
                value={values.date}
                error={touched.date && errors.date}
                onBlur={handleBlur}
              />

              <button
                disabled={!isValid}
                className="create-new-file-button"
                onClick={handleSubmit}
                type="button"
              >
                Create
              </button>
            </>
          );
        }}
      </Formik>
      <button
        className={'close-modal-button'}
        onClick={() => props.toggleModalLocal(false)}
      >
        <img src={closeIcon} alt="closeModal" srcSet="" />
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  currentPath: state.app.currentPath,
});

const mapDispatchToProps = dispatch => ({
  toggleModalLocal(state, content) {
    dispatch(toggleModal(state, content));
  },
  createFileLocal(fileInfo) {
    dispatch(createFile(fileInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewFile);
