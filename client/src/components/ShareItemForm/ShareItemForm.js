import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import PropTypes from 'prop-types';
import validate from './helpers/validation';
import {
  FormControl,
  TextField,
  Typography,
  MenuItem,
  Button,
  Checkbox,
  InputLabel,
  ListItemText,
  Select
} from '@material-ui/core';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/ShareItemPreview/reducer';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Mutation } from 'react-apollo';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
  }

  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  handleSelectFile = () => {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  };
  handleSelectTags = event => {
    this.setState({ selectedTags: event.target.value });
  };

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(tag => this.state.selectedTags.indexOf(tag.id) > -1)
        .map(tag => ({ title: tag.title, id: tag.id }))
    );
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  generateTagsText(tags, selected) {
    return tags
      .map(tag => (selected.indexOf(tag.id) > -1 ? tag.title : false))
      .filter(e => e)
      .join(', ');
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('Submitted!');
  };

  render() {
    const { classes, tags, updateItem, resetImage, resetItem } = this.props;

    return (
      <div>
        <Typography className={classes.header}>
          Share. Borrow. Prosper.
        </Typography>
        <Mutation mutation={ADD_ITEM_MUTATION}>
          {addItem => {
            return (
              <Form
                onSubmit={async values => {
                  addItem({
                    variables: {
                      item: {
                        ...values,
                        tags: this.state.selectedTags.map(tag => ({
                          id: tag,
                          title: ''
                        }))
                      }
                    }
                  });

                  resetItem();
                }}
                validate={values => {
                  return validate(
                    values,
                    this.state.selectedTags,
                    this.state.fileSelected
                  );
                }}
                render={({
                  handleSubmit,
                  pristine,
                  submitting,
                  invalid,
                  form
                }) => (
                  <form
                    onSubmit={event => {
                      handleSubmit(event).then(() => {
                        form.reset();
                        resetItem();
                        this.setState({
                          selectedTags: [],
                          fileSelected: false
                        });
                        this.fileInput.current.value = '';
                        resetImage();
                      });
                    }}
                  >
                    <FormSpy
                      subscription={{ values: true }}
                      component={({ values }) => {
                        if (values) {
                          this.dispatchUpdate(values, tags, updateItem);
                        }
                        return '';
                      }}
                    />
                    <label htmlFor="contained-button-file">
                      {!this.state.fileSelected ? (
                        <Button
                          className={classes.imageButton}
                          variant="contained"
                          component="span"
                          onClick={() => {
                            this.fileInput.current.click();
                          }}
                        >
                          select an image
                        </Button>
                      ) : (
                        <Button
                          className={classes.resetImage}
                          onClick={() => {
                            this.fileInput.current.value = '';
                            this.setState({ fileSelected: false });
                            resetImage();
                          }}
                        >
                          reset image
                        </Button>
                      )}
                      <input
                        hidden
                        type="file"
                        id="fileInput"
                        ref={this.fileInput}
                        accept="image/*"
                        onChange={this.handleSelectFile}
                      />
                    </label>
                    <Field
                      name="title"
                      render={({ input, meta }) => {
                        return (
                          <div className="field" width="100%">
                            <TextField
                              className={classes.textField}
                              id="standard-textarea"
                              label="Name your item"
                              margin="normal"
                              {...input}
                            />
                            {meta.touched &&
                              meta.invalid && (
                                <div className="error">{meta.error}</div>
                              )}
                          </div>
                        );
                      }}
                    />
                    <Field
                      name="description"
                      render={({ input, meta }) => {
                        return (
                          <div>
                            <TextField
                              className={classes.textField}
                              id="filled-description"
                              placeholder="Describe your item"
                              multiline
                              rows="4"
                              {...input}
                            />
                            {meta.touched &&
                              meta.invalid && (
                                <div className="error">{meta.error}</div>
                              )}
                          </div>
                        );
                      }}
                    />
                    <Field
                      name="tags"
                      render={({ input, meta }) => (
                        <FormControl className={classes.formControl}>
                          <InputLabel
                            className={classes.dropDown}
                            htmlFor="select-multiple-checkbox"
                          >
                            Add some tags
                          </InputLabel>
                          <Select
                            className={classes.menu}
                            multiple
                            onChange={this.handleSelectTags}
                            renderValue={selected => {
                              return this.generateTagsText(tags, selected);
                            }}
                            value={this.state.selectedTags}
                          >
                            {tags &&
                              tags.map(tag => (
                                <MenuItem key={tag.id} value={tag.id}>
                                  <Checkbox
                                    checked={
                                      this.state.selectedTags.indexOf(tag.id) >
                                      -1
                                    }
                                  />
                                  <ListItemText>{tag.title}</ListItemText>
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <Button
                      className={classes.shareButton}
                      type="submit"
                      disabled={pristine || submitting || invalid}
                    >
                      Share
                    </Button>
                  </form>
                )}
              />
            );
          }}
        </Mutation>
      </div>
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,

  updateItem: PropTypes.func.isRequired,
  resetImage: PropTypes.func.isRequired,
  resetItem: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetItem() {
    dispatch(resetItem());
  },
  resetImage() {
    dispatch(resetImage());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));
