import React from 'react';

export const DrugListComponent = class DrugListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        response: ''
    };
  }

  getDrugs = () => {
    if(this.props.genericUrl) {
        console.log(this.props.genericUrl);
        fetch(this.props.genericUrl,
            {
              method: 'GET'
            }
        )
        .then(response => response.json())
        .then(data => {
            let promises = [];

            if(Array.isArray(data.items)) {
                data.items.forEach(item => {
                    let promise = fetch(this.props.commercialUrl + item.conceptId,
                        {
                          method: 'GET'
                        }
                    )
                    .then(response => response.json())
                    .then(data => {
                        if(Array.isArray(data.items)) {
                            item.commercialItems = data.items;
                        }
                    });
                    promises.push(promise);
                });
            }

            Promise.all(promises).then(() => {
                this.setState({
                    response: JSON.stringify(data, null, 2)
                });
            });
        });
    }
  }

  renderCommercial(commercialItems) {
    return commercialItems.map((item, index) =>
        <li key={index}>
            <div>
                Commercial drug <span>{index+1}</span>: <span>{item.additionalFields.NavnFormStyrke}</span> <span>{item.additionalFields.MerkevareId}</span>
            </div>
        </li>
    )
  }

  renderDrugs() {
      if(this.state.response) {
        let json = JSON.parse(this.state.response);
        console.log(json);

        if(Array.isArray(json.items)) {
            return json.items.map((item, index) =>
                <li key={index}>
                    <div>
                        Generic drug <span>{index+1}</span>: <span>{item.pt.term}</span> <span>{item.conceptId}</span>
                    </div>
                    {Array.isArray(item.commercialItems) ?
                        <ul>
                            {this.renderCommercial(item.commercialItems)}
                        </ul>
                    : null
                    }
                </li>
            )
        }
      }
      return null;
  }

  render() {
      return (
          <div>
              <div>
                  <button onClick={this.getDrugs}>Søk etter legemiddel</button>
              </div>
              <div>
                <ul>
                    {this.renderDrugs()}
                </ul>
              </div>
          </div>
      )
  }

}

export default DrugListComponent;