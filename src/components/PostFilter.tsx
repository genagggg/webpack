import React from 'react'
import MySelect from './UI/select/MySelect'
import MyInput from './UI/input/MyInput'

export default function PostFilter({filter, setFilter}: any) {
  return (
    <div>
        <MyInput
          value={filter.query}
          onChange={(e: any) => setFilter({...filter, query: e.target.value})}
          placeholder="Поиск..."
        />
        <MySelect
          value={filter.sort}
          onChange={(selectedSort: any)=>setFilter({...filter, sort: selectedSort})}
          defaultValue="Сортировка по"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
    </div>
  )
}
