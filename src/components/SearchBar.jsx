import React from "react"
import { Level, Field, Control, Input, Button } from "rbx"

const SearchBar = (props) => {
  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log('On submitted')
  }
  return (
    <Level>
      <Level.Item>
        <form onSubmit={handleSubmit}>
          <Field kind="addons">
            <Control>
              <Input type="search" onChange={props.setTerm} placeholder="Girl" rounded />
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