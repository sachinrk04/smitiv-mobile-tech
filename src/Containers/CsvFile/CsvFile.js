import React, { Component } from 'react';
import CSVReader from "react-csv-reader";
import {Card, CardBody, CardFooter, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './CsvFile.css';

const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(/\W/g, '_')
  }

class CsvFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            currentPage: 1,
            perPage: 10,
        }
    }

    handleForce = data => {
        this.setState({ datas: data })
    };

    handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
    };

    render() {
        console.log(this.state)
        const { datas, currentPage, perPage } = this.state;

        const indexofLastPage = currentPage * perPage;
        const indexOfFirstTodo = indexofLastPage - perPage;
        const loadedDatas = datas.slice(indexOfFirstTodo, indexofLastPage);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(datas.length / perPage); i++) {
        pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map((number, index) => {
            return (
                <PaginationItem key={index}>
                    <PaginationLink id={number} onClick={this.handleClick}>{number}</PaginationLink>
                </PaginationItem>
            );
        });
        return (
            <div className="container">
                <CSVReader
                    cssClass="react-csv-input"
                    label="Select CSV File"
                    onFileLoaded={this.handleForce}
                    parserOptions={papaparseOptions}
                />

                {
                    loadedDatas.length > 0 ?
                        <Card>
                            <CardBody className="p-0">
                                <Table size="sm" striped className="table-outline mb-0 d-sm-table">
                                    <thead className="thead-dark text-white">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {
                                        loadedDatas.length > 0 ?
                                            loadedDatas.map(list => {
                                                return (
                                                    <tr key={list.id}>
                                                        <th>{list.id}</th>
                                                        <th>{list.name}</th>
                                                        <th>{list.contact}</th>
                                                        <th>{list.address}</th>
                                                    </tr>
                                                )
                                            })
                                        :null
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                <Pagination className="pagination">
                                    {renderPageNumbers}
                                </Pagination>
                            </CardFooter>
                        </Card>
                    :null
                }
            </div>
        );
    }
}

export default CsvFile;