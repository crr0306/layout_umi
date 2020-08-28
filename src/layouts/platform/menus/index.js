
import Redirect from 'umi/redirect';
import { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
const { SubMenu, Item } = Menu;
class LeftMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.renderMenu = memoizeOne(this.renderMenu, isEqual);
  }
  renderMenu(data = [], pathtitles = []) {
    const rows = Array.isArray(data) ? data : data.rows;
    const self = this;
    const { mode } = this.props;
    return rows.map((row) => {
      if (row === undefined) {
        return false;
      }
      console.log("row:", row);
      const { title: name, link = "", key = link, icon = "bars", children, target = '_blank', ...restState } = row;
      if (children && children.length > 0) {
        const subMenu = self.renderMenu(children, pathtitles.concat(name));
        return (
          <SubMenu key={key} text={name} title={<span><Icon type={icon} />{name}</span>}>
            {subMenu}
          </SubMenu>
        );
      } else {
        const { url: href } = restState;
        if (link === '' && href) {
          return (
            <Item key={href.slice(-5)}
              text={name}
            >
              <a href={href} target={target}>
                <Icon type={icon}/>
                <span>{name}</span>
              </a>
            </Item>
          );
        } else {
          return (
            <Item key={key} text={name}>
              <Link to={{
                pathname: link, state: {
                  ...restState, key, pathtitles: pathtitles.concat(name)
                }
              }}>
                <Icon type={icon}/>
                <span>{name}</span>
              </Link>
            </Item>
          );
        }
      }
    });
  }
  render() {
    const { menusData } = this.props;
    const menus = this.renderMenu(menusData);
    return (<Menu>
      {menus}
    </Menu>);

  }
}
export default connect(({ menu: { menusData } }) => ({ menusData }))((LeftMenu));