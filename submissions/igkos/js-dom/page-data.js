const arraySorts = [
    {
        name: "bubbleSort",
        content: `
// bubble Sort

// Loop through the array
// If this item > next item, swap them
// Indicate a swap occurred
// If a swap occurred, loop through the array again
// Continue looping until no swaps occur

function bubbleSort(array) {
    let swapped = false

    do {
        swapped = false

        array.forEach((item, index) => {
            if (item > array[index + 1]) {
                console.log(array)
                const temporary = item

                array[index] = array[index + 1]
                array[index + 1] = temporary

                swapped = true
            }
        })
    } while (swapped)

    return array
}
`,
        img:"img/Bubble Sort.gif",
        prosConsSorting:"pros:\n" +
            "\n" +
            "Again nothing, maybe just “catchy name1”\n" +
            "\n" +
            "cons:\n" +
            "\n" +
            "With polynomial O(n2) it is too slow\n" +
            "\n" +
            "Practical usage:\n" +
            "\n" +
            "Implementing it makes for an interesting programming exercise",
    },
    {
        name: "Quick Sort",
        content: `
//Quick Sort

// Recursive
// We receive an array and pick a "pivot"
// Items are compared to the pivot
// If an items is less than the pivot, put it in
// the "left" array, else into the "right" array
//Return the array resulting from quickSort
// called on the left, the pivot, and quicksort on the "right"

function quickSort(array) {
    if (array.length < 2) {
        return array
    }

    const pivotIndex = array.length - 1
    const pivot = array[pivotIndex]
    const left = []
    const right = []

    for (let i = 0; i < pivotIndex; i++) {
        const currentItem = array[i]
        currentItem < pivot
            ? left.push(currentItem)
            : right.push(currentItem)
    }
    const result = [...quickSort(left), pivot, ...quickSort(right)]

    console.log(result)

    return result
}
`,
        img:"img/Quicksort.gif",
        prosConsSorting:"pros:\n" +
            "\n" +
            "Most often than not runs at O(nlogn)\n" +
            "\n" +
            "Quick sort is tried and true, has been used for many years in industry so you can be assured it is not going to fail you\n" +
            "\n" +
            "High space efficiency by executing in place\n" +
            "\n" +
            "cons:\n" +
            "\n" +
            "Polynomial worst case scenario makes it susceptible for time critical applications\n" +
            "\n" +
            "Provides non stable sort due to swapping of elements in partitioning step\n" +
            "\n" +
            "Practical usage:\n" +
            "\n" +
            "Best choice for general purpose and in memory sorting\n" +
            "\n" +
            "Used to be the standard algorithm for sorting of arrays of primitive types in Java\n" +
            "\n" +
            "qsort utility in C programming language is powered by quick sort"
    },
    {
        name: "Insertion Sort",
        content:`
// Insertion Sort

// Uses nested loops
// Assumes a sorted list of length 1
// Compares the next item, and inserts it before or
// after depending on the comparison

function insertionSort(array) {
        let i
        let j

        for (i = 1; i < array.length; i++) {
    for (j = 0; j < i; j++) {
        console.log(array)

        if (array[i] < array[j]) {
            const [item] = array.splice(i, 1)
            array.splice(j, 0, item)
        }
    }
}

console.log(array)
return array
}
`,
        img:"img/Insertion Sort.gif",
        prosConsSorting:"pros:\n" +
            "\n" +
            "Easy to implement\n" +
            "\n" +
            "The more the sequence is ordered the closer is run time to linear time O(n)\n" +
            "\n" +
            "cons:\n" +
            "\n" +
            "Not suitable for large data sets\n" +
            "\n" +
            "Still polynomial at worst case\n" +
            "\n" +
            "Practical usage\n" +
            "\n" +
            "For small applications when the sequence is small (less than 50 elements)\n" +
            "\n" +
            "When the sequence is going to be almost sorted"
    },
    {
        name:"Merge Sort",
        content:`
// Merge Sort

// Divides the given array into two halvest: a
// left and a right sub array
// Calls merge Sort on these sub arrays
// Once we get to arrays that are less than 2 in
// length, we begin to stitch them back together
// We sort as we stich them up, thus leading to
// our sorted array by the time we're all the way
// back up the stack

function mergeSort(array) {
    if (array.length < 2) {
        return array
    }

    const middle = Math.floor(array.length / 2)
    const left = array.slice(0, middle)
    const right = array.slice(middle)

    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    const sorted = []

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            sorted.push(left.shift())
        } else {
            sorted.push(right.shift())
        }
    }

    const results = [...sorted, ...left, ...right]
    console.log(results)

    return results
}`,
        img:"img/Merge Sort.gif",
        prosConsSorting:" pros:\n" +
            "\n" +
            "Excellent choice when data is fetched from resources other than main memory\n" +
            "\n" +
            "Having a worst case scenario run time of O(nlogn) which is optimal\n" +
            "\n" +
            "Tim sort variant is really powerful\n" +
            "\n" +
            "cons:\n" +
            "\n" +
            "Lots of overhead in copying data between arrays and making new arrays\n" +
            "\n" +
            "Extremely difficult to implement it in place for arrays\n" +
            "\n" +
            "Space inefficiency\n" +
            "\n" +
            "Practical usage:\n" +
            "\n" +
            "When data is in different locations like cache, main memory, external memory etc.\n" +
            "\n" +
            "A multi-way merge sort variant is used in GNU sorting utility\n" +
            "\n" +
            "Tim sort variant is standard sorting algorithm in Python programming language since 2003\n" +
            "\n" +
            "Default sorting algorithm of arrays of object type in Java since version 7 onward\n" +
            "\n"
    }
]
