import React, { useState } from "react";
// import { withdrawRewards, startIdo } from "api/secret/secret";
import "./App.css";
import { uploadFile, getFile } from "api/wallet";

export const CreatePage = () => {
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewImage1, setPreviewImage1] = useState<string>();
  const [imageInfo, setImageInfo] = useState("");
  const [imageInfo1, setImageInfo1] = useState("");
  // const [landingImage, setLandingImage] = useState("");
  // const [landingDescription, setLandingDescription] = useState("");
  // const [landingTitle, setLandingTitle] = useState("");
  // const [landingSubtitle, setLandingSubtitle] = useState("");
  // const [landingTarget, setLandingTarget] = useState("");
  // const [landingPrice, setLandingPrice] = useState("");
  // const [landingStarts, setLandingStarts] = useState("");
  // const [image, setImage] = useState("");
  // const [name, setName] = useState("");
  // const [token, setToken] = useState("");
  // const [title, setTitle] = useState("");
  // const [subtitle, setSubtitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [idoAddress, setIdoAddress] = useState("");
  // const [idoToken, setIdoToken] = useState("");
  // const [paymentToken, setPaymentToken] = useState("");

  const selectFile = (event: any) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    uploadAction(event.target.files[0], true);
  };
  const selectFile1 = (event: any) => {
    setPreviewImage1(URL.createObjectURL(event.target.files[0]));
    uploadAction(event.target.files[0], false);
  };

  const uploadAction = (imageFile: any, state: any) => {
    uploadFile(imageFile, state)
      .then(() => {
        return getFile();
      })
      .then((files) => {
        const base64string = btoa(
          String.fromCharCode(...new Uint8Array(files.data.data))
        );
        console.log({ base64string });
        state ? setImageInfo(base64string) : setImageInfo1(base64string);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log({ imageInfo, imageInfo1 });

  return (
    <div className="center-vertical">
      <p className="title mt-2 mb-2">
        <b>Project Creation</b>
      </p>
      <section>
        <div className="subtitle mb-2">1. &nbsp; General</div>
        <div className="w-60 center-vertical">
          <div className="label-input">
            <p className="content">IDO Address</p>
            <input className="content" placeholder="Enter the address"></input>
          </div>
          <div className="label-input">
            <p className="content">IDO Token</p>
            <input className="content" placeholder="Enter the address"></input>
          </div>
          <div className="label-input">
            <p className="content">Payment Token</p>
            <input className="content" placeholder="Enter the address"></input>
          </div>
        </div>
      </section>
      <section>
        <div className="subtitle mb-2">2. &nbsp; Landing Page</div>
        <div className="card">
          <div className="image">
            {previewImage && (
              <img className="preview" src={previewImage} alt="" />
            )}
            <input
              className="image-select"
              type="file"
              accept="image/*"
              onChange={selectFile}
            />
          </div>
          <input
            type="text"
            className="content w-100"
            placeholder="Enter description"
          />
          <input
            type="text"
            className="content w-100"
            placeholder="Enter title"
          />
          <input
            type="text"
            className="content w-100"
            placeholder="Enter subtitle"
          />
          <div className="label-input">
            <p className="content">USD target</p>
            <input className="content" placeholder="Enter the address"></input>
          </div>
          <div className="label-input">
            <p className="content">Price</p>
            <input className="content" placeholder="Enter the address"></input>
          </div>
          <div className="label-input">
            <p className="content">Projects starts</p>
            <input className="content" placeholder="Enter the address"></input>
          </div>
        </div>
      </section>

      <section>
        <div className="subtitle mb-2">3. &nbsp; Listing Page</div>
        <div className="card1">
          <div className="image-small">
            {previewImage1 && (
              <img className="preview" src={previewImage1} alt="" />
            )}
            <input
              className="image-select"
              type="file"
              accept="image/*"
              onChange={selectFile1}
            />
          </div>
          <div className="center-vertical">
            <input
              type="text"
              className="content w-100"
              placeholder="Enter project name"
            />
            <input
              type="text"
              className="content w-100"
              placeholder="Enter token name"
            />
            <input
              type="text"
              className="content w-100"
              placeholder="Enter brief description"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="subtitle mb-2">4. &nbsp; Project Page</div>
        <div className="card">
          <input
            type="text"
            className="content w-100"
            placeholder="Enter title"
          />
          <input
            type="text"
            className="content w-100"
            placeholder="Enter subtitle"
          />
        </div>
      </section>
    </div>
  );
};
