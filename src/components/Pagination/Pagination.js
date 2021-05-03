import { Button } from "@chakra-ui/button";
import { IconButton } from "@chakra-ui/button";
import { ButtonGroup } from "@chakra-ui/button";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function Pagination(props) {
  const size = useBreakpointValue({ base: "md", md: "lg" });

  const pageNeighbours = 2;
  const [numbers, setNumbers] = useState([]);
  const [previus, setPrevius] = useState();
  const [next, setNext] = useState();
  const [totalPages, setTotalPages] = useState();

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  useEffect(() => {
    const totalPages = Math.ceil(props.count / props.perPage);

    const previus = Math.max(1, props.currentPage - 1);
    const next = Math.min(totalPages, props.currentPage + 1);

    const totalNumbers = pageNeighbours * 2 + 1;

    var from = 1;
    var to = totalPages;

    if (totalPages > totalNumbers) {
      from = Math.max(1, props.currentPage - pageNeighbours);
      to = Math.min(totalPages, props.currentPage + pageNeighbours);
      let pages = range(from, to);

      let diff = totalNumbers - pages.length;

      if (props.currentPage <= pageNeighbours) to = to + diff;
      if (props.currentPage >= totalPages - pageNeighbours) from = from - diff;
    }

    const numbers = [];
    for (let i = from; i <= to; i++) {
      numbers.push(i);
    }

    setNumbers(numbers);
    setPrevius(previus);
    setNext(next);
    setTotalPages(totalPages);
  }, [props]);

  return (
    <ButtonGroup spacing="2" size={size}>
      <IconButton
        icon={<FaAngleLeft />}
        borderRadius="50%"
        variant={"outline"}
        disabled={props.currentPage === 1 ? true : false}
        onClick={() => props.setCurrentPage(previus)}
      ></IconButton>
      {numbers.map((number) => (
        <Button
          key={number}
          borderRadius="50%"
          colorScheme={number === props.currentPage ? "blue" : null}
          variant={number === props.currentPage ? "solid" : "outline"}
          onClick={() => props.setCurrentPage(number)}
        >
          {number}
        </Button>
      ))}
      <IconButton
        icon={<FaAngleRight />}
        borderRadius="50%"
        variant={"outline"}
        disabled={props.currentPage === totalPages ? true : false}
        onClick={() => props.setCurrentPage(next)}
      ></IconButton>
    </ButtonGroup>
  );
}

export default Pagination;
