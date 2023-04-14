import _ from 'lodash';


export default function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber -1) * pageSize
    // we convert the list into a lodash object using the _() so we can chain lodash methods
    // then we use the _.slice() to slice the array starting from a given index
    // then we use _.take() to take a number of items we want to take from an array
    // then we use the _.value() to convert back the lodash object into an array 
    return _(items).slice(startIndex).take(pageSize).value();
}