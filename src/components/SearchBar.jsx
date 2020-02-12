import React from "react"
import { Level, Field, Control, Input, Button } from "rbx"

const SearchBar = (props) => {

  return (
    <Level>
      <Level.Item>
        <form onSubmit={props.handleSubmit}>
          <Field kind="addons">
            <Control>
              <Input name="term" type="search" placeholder="Girl" rounded />
            </Control>
            <Control>
              <Button type="submit" color="link" rounded>Search</Button>
            </Control>
          </Field>
        </form>
      </Level.Item>
    </Level>
  )
}

export default SearchBar