import React, { useState } from "react";
import { connect } from "react-redux";
import { getTasks } from "../../store/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  InputGroup,
  Form,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router";
// import { useNavigate } from "react-router";

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

function Search({ getTasks }) {
  const navigate = useNavigate();
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
    const searchParams = {};

    search && (searchParams.search = search);
    sort.value && (searchParams.sort = sort.value);
    status.value && (searchParams.status = status.value);

    for (let key in dates) {
      const value = dates[key];
      if (value) {
        const date = value.toLocaleDateString();

        searchParams[key] = date;
      }
    }

    getTasks(navigate, searchParams);
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
              //onMouseUp={handleSubmit}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <Button variant="outline-primary" onClick={handleSubmit}>
          Search
        </Button>
      </InputGroup>

      {dateOptions.map((option, index) => (
        <div key={index}>
          <span>{option.label}</span>
          <DatePicker
            selected={dates[option.value]}
            onChange={(value) => handleChangeDate(value, option.value)}
          />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    navigate: state.navigate
  }
}

const mapDispatchToProps = {
  getTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
