import React, { Component } from "react";

const LiveSearchBox = (props) => {
  const { value, onChange, placeHolder } = props;
  return (
    
      <form className="form-inline w-100">
        <input
          className="form-control mr-sm-6 w-100"
          type="search"
          placeholder={placeHolder}
          aria-label="Search"
          style={{ width: "100%" }}
          onChange={(event) => onChange(event.currentTarget.value)}
          value={value}
        />
        {/* <button
                            class="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                          >
                            Search
                          </button> */}
      </form>
    
  );
};

export default LiveSearchBox;
