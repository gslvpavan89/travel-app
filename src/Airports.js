import React from "react";
import model from "./model";
import ReactTable from "react-table";
import "react-table/react-table.css";
import services from "./services";

class Airports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      columns: [
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Code",
          accessor: "code"
        },
        {
          Header: "Description",
          accessor: "description"
        }
      ],
      airports: model.airports,
      pages: 0
    };
  }

  render() {
    const state = this.state;
    return (
      <div style={{ margin: 10 }}>
        <ReactTable
          data={state.airports}
          pages={state.pages}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          defaultPageSize={5}
          columns={state.columns}
          showPagination={true}
          showPaginationTop={false}
          showPaginationBottom={true}
          onFetchData={(state, instance) => {
            this.setState({ loading: true });
            services.fetchPagedAirports(
              this,
              state.page,
              state.pageSize,
              state.sorted,
              state.filtered
            );
          }}
          manual
        />
      </div>
    );
  }
}
export default Airports;
