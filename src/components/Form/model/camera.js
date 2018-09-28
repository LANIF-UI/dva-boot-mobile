import React from 'react';
import PropTypes from 'prop-types';
import { List, ImagePicker, Modal } from 'antd-mobile';
import { isFunction } from 'cmn-utils/lib/utils';
import { openCamera, fileSelector } from 'components/Native';
import { notice } from '@/config';
const Item = List.Item;
const operation = Modal.operation;

/**
 * 拍照元件，需要Native支持
 */
export default ({ form, record, preview, field, key }) => {
  const { getFieldDecorator } = form;
  const { title, name, formItem, normalize } = field;
  const {
    type,
    initialValue,
    options = {},
    rules,
    onChange,
    placeholder,
    ...otherProps
  } = formItem;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if (isFunction(normalize)) {
      options.initialValue = normalize(initval);
    } else {
      options.initialValue = initval;
    }
  }

  if (preview) {
    if (type === 'hidden') return null;
    return (
      <Item key={key} extra={initval || ''}>
        {title}
      </Item>
    );
  }

  // 常用必填项验证
  if (otherProps.required) {
    options.rules = [
      {
        required: true,
        message: placeholder || `请选择${title}`
      }
    ];
  }

  // 如果有rules
  if (rules && rules.length) {
    options.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    options.onChange = value => onChange(form, value);
  }

  const tProps = {
    placeholder: placeholder || `请选择${title}`,
    ...otherProps
  };

  return (
    <div key={key} className="am-list-item am-list-item-middle">
      <div className="am-list-line">
        <div className="am-input-control">
          {getFieldDecorator(name, options)(<CameraControlled {...tProps} />)}
        </div>
      </div>
    </div>
  );
};

class CameraControlled extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      files: value
        ? value.map((url, ...otherItem) => ({
            url: url,
            ...otherItem
          }))
        : []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value) {
      this.setState({
        files: value
          ? value.map((url, ...otherItem) => ({
              url: url,
              ...otherItem
            }))
          : []
      });
    }
  }

  triggerChange = (files, type, index) => {
    this.setState({
      files
    });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(files);
    }
  };

  onAddImageClick = e => {
    e.preventDefault();
    operation([
      { text: '拍照', onPress: () => this.onOpenCamera() },
      { text: '从相册选择', onPress: () => this.onOpenFile() }
    ]);
  };

  onOpenCamera = () => {
    notice.loading();
    openCamera()
      .then(data => {
        this.getFile(data);
      })
      .catch(_ => notice.close());
  };

  onOpenFile = () => {
    notice.loading();
    fileSelector()
      .then(data => {
        this.getFile(data);
      })
      .catch(_ => notice.close());
  };

  getFile = data => {
    const { files } = this.state;
    const newFile = {};
    if (data.src) {
      newFile.url = data.src.replace(/'/g, '');
    } else {
      data.forEach(item => {
        const ext = item.fileName.substring(
          item.fileName.indexOf('.') + 1,
          item.fileName.length
        );
        newFile.url = `data:image/${ext};base64,${item.imageData}`;
      });
    }

    const nfiles = [...files, newFile];
    this.setState({
      files: nfiles
    });
    
    this.triggerChange(nfiles);
    notice.close();
  };

  render() {
    const { files } = this.state;
    const { selectable = true, maxLengh = 2 } = this.props;
    let _selectable = selectable;
    if (maxLengh) {
      _selectable = !!selectable && (files.length < maxLengh)
    }
    return (
      <ImagePicker
        files={files}
        onChange={this.triggerChange}
        onAddImageClick={this.onAddImageClick}
        selectable={_selectable}
        data-title={"abababab"}
      />
    );
  }
}
