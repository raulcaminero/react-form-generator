import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import { Input } from 'antd';

import IntlMessages from 'util/IntlMessages';

class SamplePage extends React.Component {

  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.MiPage" />}
        />

        {/* <div className="d-flex justify-content-center">
          <h1><IntlMessages id="pages.MiPage.description" />
          </h1>
        </div> */}



        <div className="row">

          <div className="col-md-3 form-group">
            <label>Label1</label>
            <Input className="form-control" type="text" />
          </div>

          <div className="col-md-3 form-group">
            <label>Dirigido por</label>
            <Input className="form-control" type="text" />
          </div>

          <div className="col-md-3  form-group">
            <label>Organización</label>
            <Input className="form-control" type="text" />
          </div>

          <div className="col-md-3 form-group">
            <label>Cargo</label>
            <Input className="form-control" type="text" />
          </div>
          
          <div className="col-md-3 form-group">
            <label>En demanda de</label>
            <Input className="form-control" type="text" />
          </div>


          <div className="col-md-3 form-group">
            <label>A favor de</label>
            <Input className="form-control" type="text" />
          </div>

          <div className="col-md-3 form-group">
            <label>En contra de</label>
            <Input className="form-control" type="text" />
          </div>


        </div>

      </div>

    );
  }
}

export default MiPage;