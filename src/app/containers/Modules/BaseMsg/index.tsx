import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import Detail from '../../../components/Detail';
import SommthedLine from '../../../components/Echart/SmoothedLine';
import { IBaseMsg } from '../../../interfaces'
import Title from '../../../components/Title';
import './index.css';

interface SommthedLineOpt {
  width: number;
  height: number;
  id: string;
  title: string;
}

interface BaseMsgProps extends IBaseMsg {
}

interface BaseMsgState {
  pvSommthedLineOpt: SommthedLineOpt;
  uvSommthedLineOpt: SommthedLineOpt;
}

@inject('baseMsg', 'router')
@autobind
@observer
class BaseMsg extends React.Component<BaseMsgProps, BaseMsgState> {
  constructor (props: BaseMsgProps, state: BaseMsgState) {
    super(props, state);
    this.state = {
      pvSommthedLineOpt: {
        width: 500,
        height: 300,
        id: 'pvLine',
        title: '浏览量(pv)'
      },
      uvSommthedLineOpt: {
        width: 500,
        height: 300,
        id: 'uvLine',
        title: '用户量(uv)'
      }
    };
  }
  componentWillMount () {
    this.props.baseMsg.getWebSites();
  }
  render () {
    const title = '信息导航';
    const messages = [
      { name: '名称:', value: 'TinyLog' },
      { name: '域名:', value: 'www.tinylog.org' },
      { name: 'ip地址:', value: '1000' },
      { name: '健康指标:', value: '正常' },
      { name: '用户数量:', value: '1000个' }
    ];
    return (
      <div>
        <Detail title={title} messages={messages}/>
        <div>
          <Title title="网站基本数据走势"/>
          <div className="base-msg-data-cont">
            <SommthedLine {...this.state.pvSommthedLineOpt}/>
            <SommthedLine {...this.state.uvSommthedLineOpt}/>
          </div>
        </div>
      </div>
    );
  }
}

export default BaseMsg;