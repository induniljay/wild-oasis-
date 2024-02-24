import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://bbsfgdcrncsbtjtlfvoy.supabase.co/storage/v1/object/sign/cabin-images/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTcwODc5NDM4NSwiZXhwIjoxNzQwMzMwMzg1fQ.GJs25RgSQdfZb_uZ2jNL4fg7-vWcKaM4yPTmE8rubzY&t=2024-02-24T17%3A06%3A26.066Z"
        alt="cabin-image-001"
      />
    </Row>
  );
}

export default Cabins;
