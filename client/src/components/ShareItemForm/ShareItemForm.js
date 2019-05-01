import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import { connect } from 'react-redux';
import {
  TextField,
  Button,
  ListItemText,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  Typography
} from '@material-ui/core/';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/ShareItemPreview/reducer';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

// forms lesson prework source 8
export const FormConfig = {
  placeholder: {
    title: 'Name your item',
    description: 'Describe your item',
    tags: 'Add some tags'
  }
};
function InputField({ value, placeholder, onChange, meta }) {
  return (
    <div>
      <div>
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

// forms lesson prework source 8
const FormView = ({
  classes,
  handleSubmit,
  tags,
  dispatchUpdate,
  pristine,
  invalid,
  form,
  updateItem,
  fileInput,
  generateTagsText,
  selectedTags,
  handleSelectTag,
  handleSelectFile
}) => {
  return (
    <div>
      {/*Typography className={classes.shareFormTitle}*/}
      <h1>Share. Borrow. Prosper. </h1>
      <form onSubmit={handleSubmit}>
        <FormSpy
          subscription={{ values: true }}
          component={({ values }) => {
            if (values) {
              dispatchUpdate(values, tags, updateItem);
            }
            return '';
          }}
        />
        <Field
          name="imageurl"
          render={({ input, meta }) => (
            <div>
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                id="fileinput"
                hidden
                onClick={e => handleSelectFile(e)}
              />
              <Button
                onClick={() => {
                  fileInput.current.click();
                }}
                className={classes.select}
              >
                Select an image
              </Button>
            </div>
          )}
        />
        <input
          hidden
          ref={fileInput}
          onChange={e => this.handleSelectFile(e)}
          type="file"
          name="imageSelect"
          id="imageSelect"
        />

        <Field
          name="title"
          render={({ input, meta }) => (
            <InputField
              placeholder={FormConfig.placeholder[input.name]}
              onChange={input.onChange}
              meta={meta}
              value={input.value}
            />
          )}
        />

        <Field
          name="description"
          render={({ input, meta }) => (
            <InputField
              placeholder={FormConfig.placeholder[input.name]}
              onChange={input.onChange}
              meta={meta}
              {...input}
            />
          )}
        />

        <Field name="tags">
          {({ input, meta }) => {
            return (
              <Select
                multiple
                value={selectedTags}
                onChange={handleSelectTag}
                renderValue={selected => {
                  return generateTagsText(tags, selected);
                }}
              >
                {tags &&
                  tags.map(tag => (
                    <MenuItem key={tag.id} value={tag.id}>
                      <Checkbox checked={selectedTags.indexOf(tag.id) > -1} />
                      <ListItemText primary={tag.title} />
                    </MenuItem>
                  ))}
              </Select>
            );
          }}
        </Field>
        {/* <FormControl>
          <InputLabel htmlFor="select-multiple-checkbox">
            Add some tags
          </InputLabel>
          <Select
            name="tags"
            render={({ input, meta }) => (
              <InputField placeholder={FormConfig.placeholder[input.name]} />
            )}
          >
            {tags &&
              tags.map(tag => (
                <MenuItem key={tag} value={tag.title}>
                  <Checkbox checked={tag} />
                  <ListItemText primary={tags} />
                </MenuItem>
              ))}
          </Select>
        </FormControl> */}

        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
    this.fileInput = React.createRef();
  }
  handleSelectTag = event => {
    this.setState({
      selectedTags: event.target.value
    });
  };
  handleSelectFile = event => {
    this.setState({
      fileSelected: this.fileInput.current.files[0]
    });
  };
  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
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
  resetFileInput = () => {
    this.fileInput.current.value = '';
    this.props.resetImage();
    this.setState({ fileSelected: false });
  };
  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  dispatchUpdate = (values, tags, updateItem) => {
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
  };

  // { handleSubmit, pristine, invalid, form, tags }

  render() {
    const { tags, classes } = this.props;
    return (
      <div className={this.props.classes.share}>
        <Form
          onSubmit={values => {
            this.saveItem(values);
          }}
          render={props => (
            <FormView
              {...props}
              tags={tags}
              dispatchUpdate={this.dispatchUpdate}
              fileInput={this.fileInput}
              updateItem={this.props.updateItem}
              selectedTags={this.state.selectedTags}
              generateTagsText={this.generateTagsText}
              handleSelectTag={this.handleSelectTag}
              classes={classes}
              handleSelectFile={this.handleSelectFile}
            />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetImage() {
    dispatch(resetImage());
  },
  resetItem() {
    dispatch(resetItem());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareForm));
