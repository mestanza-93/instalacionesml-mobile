interface FilterInterface {
    limit: Number,
    sort: String,
    field: String
    fieldValue: any,
    fieldType: any,
    operators: {
        field: any,
        value: any
    }[]
}

export default FilterInterface;