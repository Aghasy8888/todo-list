import React, { useState } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  InputGroup,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

const statusOptions = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Done",
    value: "done",
  },
];
const sortOptions = [
  {
    label: "All",
    value: "",
  },
  {
    label: "A-Z",
    value: "a-z",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
  {
    label: "Creation date oldest",
    value: "creation_date_oldest",
  },
  {
    label: "Creation date newest",
    value: "creation_date_newest",
  },
  {
    label: "Completion date oldest",
    value: "completion_date_oldest",
  },
  {
    label: "Completion date newest",
    value: "completion_date_newest",
  },
];

const dateOptions = [
  {
    label: "Created before",
    value: "create_lte",
  },
  {
    label: "Created after",
    value: "create_gte",
  },
  {
    label: "Completed before",
    value: "complete_lte",
  },
  {
    label: "Completed after",
    value: "complete_gte",
  },
];

function Search(props) {
  const [status, setStatus] = useState({
    value: "",
  });

  const [sort, setSort] = useState({
    value: "",
  });

  const [search, setSearch] = useState("");

  const [dates, setDates] = useState({
    create_lte: null,

    create_gte: null,

    complete_lte: null,

    complete_gte: null,
  });

  const handleChangeDate = (value, name) => {
    setDates({
      ...dates,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("status", status);
    console.log("sort", sort);
    console.log("search", search);
    console.log("dates", dates);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search"
          onChange={(event) => setSearch(event.target.value)}
        />

        <DropdownButton
          variant="outline-primary"
          title={status.value ? status.label : "Status"}
          id="input-group-dropdown-1"
        >
          {statusOptions.map((option, index) => (
            <Dropdown.Item
              active={status.value === option.value}
              key={index}
              onClick={() => setStatus(option)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <DropdownButton
          variant="outline-primary"
          title={sort.value ? sort.label : "Sort"} // you can make the button longer
          id="input-group-dropdown-1"
        >
          {sortOptions.map((option, index) => (
            <Dropdown.Item
              active={sort.value === option.value}
              key={index}
              onClick={() => setSort(option)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <Button variant="outline-primary" onClick={handleSubmit}>
          Search
        </Button>
      </InputGroup>
      <div> 
      {dateOptions.map((option) => (        
        
          <span>{option.label}</span>
          <DatePicker
            selected={dates[option.value]}
            onChange={(value) => handleChangeDate(value, option.value)}
          />
        
      ))}
      </div>
    </div>
  );
}

export default connect()(Search);
