import React, { useState, useEffect } from "react";
import { Row, Col, Select, Card, Skeleton } from "antd";
import { header, center } from "./Homepage.module.css";
import { getAllBreeds, getAllDogs } from "../utils/services";
import { toast } from "react-toastify";

const { Option } = Select;

function Homepage() {
  const [breeds, setBreeds] = useState(null);
  const [breed, setBreed] = useState("affenpinscher");
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllBreeds();
        setBreeds(Object.keys(data.message));
        setBreed(Object.keys(data.message)[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllDogs(breed);
        setImages(data.message);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [breed]);

  const onChange = (i) => {
    setBreed(i);
  };

  const onLike = (i) => {
    if (liked.includes(i)) {
      toast.error("Already liked");
    } else {
      toast.success("Liked");
      setLiked([...liked, i]);
    }
  };

  console.log(liked);

  return (
    <div>
      <div className={header}>DOGS 🐕</div>
      <div>
        <Row className={center}>
          <Col xl={8} lg={8} md={8} sm={24} xs={24}></Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Select a breed"
              defaultValue={breed}
              onChange={onChange}
            >
              {breeds
                ? breeds.map((breed, i) => {
                    return (
                      <Option key={i} value={breed}>
                        {breed[0].toUpperCase() + breed.slice(1)}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24}></Col>
        </Row>
      </div>
      <Skeleton loading={loading}>
        <Row>
          <Col xl={4} lg={4} md={4} sm={0} xs={0}></Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            <Row>
              {images
                ? images.map((url, i) => {
                    return (
                      <Col key={i} xl={8} lg={8} md={12} sm={24} xs={24}>
                        <Card
                          hoverable
                          style={{ width: 240 }}
                          cover={<img alt="img" src={url} />}
                          onClick={() => onLike(url)}
                        ></Card>
                      </Col>
                    );
                  })
                : null}
            </Row>
          </Col>
          <Col xl={4} lg={4} md={4} sm={0} xs={0}></Col>
        </Row>
      </Skeleton>
      <div className={header}>Liked Dogs</div>
      <div>
        <Row>
          <Col xl={4} lg={4} md={4} sm={0} xs={0}></Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            <Row>
              {liked.length > 0
                ? liked.map((url, i) => {
                    return (
                      <Col key={i} xl={8} lg={8} md={12} sm={24} xs={24}>
                        <Card
                          hoverable
                          style={{ width: 240 }}
                          cover={<img alt="img" src={url} />}
                        ></Card>
                      </Col>
                    );
                  })
                : null}
            </Row>
          </Col>
          <Col xl={4} lg={4} md={4} sm={0} xs={0}></Col>
        </Row>
      </div>
    </div>
  );
}

export default Homepage;
