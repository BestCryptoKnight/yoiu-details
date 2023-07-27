import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { withdrawRewards, startIdo } from "api/secret/secret";
import "./App.css";
import { uploadFile, getFile, createIdoApi } from "api/wallet";
import { PathName } from "global";
import { Loader } from "@project/libs/components";

export const CreatePage = () => {
  const [previewImage, setPreviewImage] = useState(undefined);
  const [previewImage1, setPreviewImage1] = useState(undefined);
  const [previewImage2, setPreviewImage2] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [landingImage, setLandingImage] = useState('');
  const [landingDescription, setLandingDescription] = useState('');
  const [landingTitle, setLandingTitle] = useState('');
  const [landingSubtitle, setLandingSubtitle] = useState('');
  const [landingTarget, setLandingTarget] = useState('');
  const [landingPrice, setLandingPrice] = useState('');
  const [landingStarts, setLandingStarts] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [target, setTarget] = useState('');
  const [participants, setParticipants] = useState('');
  const [price, setPrice] = useState('');
  const [softcap, setSoftcap] = useState('');
  const [starts, setStarts] = useState('');
  const [ends, setEnds] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [idoAddress, setIdoAddress] = useState('');
  const [idoToken, setIdoToken] = useState('');
  const [paymentToken, setPaymentToken] = useState('');

  const navigate = useNavigate();

  const selectFile = (event) => {
    if (event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event?.target.files[0]));
      uploadAction(event.target.files[0], true);
    }
  }
  const selectFile1 = (event) => {
    if (event?.target.files[0]) {
      setPreviewImage1(URL.createObjectURL(event.target.files[0]));
      uploadAction(event.target.files[0], false);
    }
  }
  const selectFile2 = (event) => {
    if (event?.target.files[0]) {
      setPreviewImage2(URL.createObjectURL(event.target.files[0]));
    }
  }

  const uploadAction = (imageFile, state) => {
    setLoading(true);
    uploadFile(imageFile).then((response) => {
      return getFile();
    }).then((files) => {
      setLoading(false);
      // const base64string = btoa(String.fromCharCode(...new Uint8Array(files.data.data)))
      state ?
      setLandingImage(files.data)
      : setImage(files.data);
    }).catch((err) => {
      console.log(err)
    })
  }
  
  const handleSubmit = async() => {
    const result = await createIdoApi(
      landingImage,
      landingDescription,
      landingTitle,
      landingSubtitle,
      landingTarget,
      landingPrice,
      landingStarts,
      image,
      name,
      token,
      target,
      participants,
      price,
      softcap,
      starts,
      ends,
      title,
      subtitle,
      description,
      idoAddress,
      idoToken,
      paymentToken,
    );
    if (result.data){ 
      alert("IDO creation succeed")
      closeAdmin()
    } else alert("IDO creation failed");

  }

  const closeAdmin = () => {
    navigate(`${PathName.listings}`);
  }

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
            <input className="content" placeholder="Enter the address" onChange={(event) => setIdoAddress(event.target.value)}/>
          </div>
          <div className="label-input">
            <p className="content">IDO Token</p>
            <input className="content" placeholder="Enter the address" onChange={(e) => setIdoToken(e.target.value)}/>
          </div>
          <div className="label-input">
            <p className="content">Payment Token</p>
            <input className="content" placeholder="Enter the address" onChange={(e) => setPaymentToken(e.target.value)}/>
          </div>
        </div>
      </section>
      <section>
      <div className="subtitle mb-2">2. &nbsp; Landing Page</div>
      <div className="card">
        <div className="image">
          {previewImage && <img className="preview" src={previewImage} alt="" />}
          <input className="image-select" type="file" accept="image/*" onChange={selectFile} />
          {loading && 
            <div className="position-center">
              <Loader size={62}/>
            </div>
          }
        </div>
        <input type="text" className="content w-100" placeholder="Enter description" onChange={(e) => setLandingDescription(e.target.value)}/>
        <input type="text" className="content w-100" placeholder="Enter title" onChange={e => setLandingTitle(e.target.value)}/>
        <input type="text" className="content w-100" placeholder="Enter subtitle" onChange={e => setLandingSubtitle(e.target.value)}/>
        <div className="label-input">
          <p className="content">USD target</p>
          <input className="content" placeholder="Enter the total amount" onChange={e => setLandingTarget(e.target.value)}/>
        </div>
        <div className="label-input">
          <p className="content">Price</p>
          <input className="content" placeholder="Enter the price" onChange={e => setLandingPrice(e.target.value)}/>
        </div>
        <div className="label-input">
          <p className="content">Projects starts</p>
          <input className="content" placeholder="Enter start time like 2023-01-25" onChange={e => setLandingStarts(e.target.value)}/>
        </div>
        </div>
      </section>

      <section>
        <div className="subtitle mb-2">3. &nbsp; Listing Page</div>
        <div className="card">
          <div className="subcard">
            <div className="image-small">
              {/* {landingImage && <img src={`data:image/png;base64,${landingImage}`} alt="" />} */}
              {previewImage1 && <img className="preview" src={previewImage1} alt="" />}
              <input className="image-select" type="file" accept="image/*" onChange={selectFile1} />
              {loading && 
                <div className="position-center">
                  <Loader size={62}/>
                </div>
              }
            </div>
            <div className="center-vertical">
              <input type="text" className="content w-100" placeholder="Enter project name" onChange={e => setName(e.target.value)}/>
              <input type="text" className="content w-100" placeholder="Enter token name" onChange={e => setToken(e.target.value)}/>
            </div>
          </div>
          <input type="text" className="content w-100" placeholder="Enter brief description"/>
          <div className="label-input">
            <p className="content">Total Raise</p>
            <input className="content" placeholder="Enter total amount" onChange={e => setTarget(e.target.value)}/>
          </div>
          <div className="label-input">
            <p className="content">Participants</p>
            <input className="content" placeholder="Enter participants" onChange={e => setParticipants(e.target.value)}/>
          </div>
          <div className="label-input">
            <p className="content">Swap Price</p>
            <input className="content" placeholder="Enter swap price" onChange={e => setPrice(e.target.value)}/>
          </div>
          <div className="label-input">
            <p className="content">Softcap</p>
            <input className="content" placeholder="Enter softcap" onChange={e => setSoftcap(e.target.value)}/>
          </div>
          <div className="label-input">
            <p className="content">Start Time</p>
            <input className="content" placeholder="Enter softcap" onChange={e => setStarts(e.target.value)}/>
          </div>
          <div className="label-input">
            <p className="content">End Time</p>
            <input className="content" placeholder="Enter softcap" onChange={e => setEnds(e.target.value)}/>
          </div>
        </div>
      </section>

      <section>
        <div className="subtitle mb-2">4. &nbsp; Project Page</div>
        <div className="card">
            <input type="text" className="content w-100" placeholder="Enter title" onChange={e => setTitle(e.target.value)}/>
            <input type="text" className="content w-100" placeholder="Enter subtitle" onChange={e => setSubtitle(e.target.value)}/>
            <div className="subcard">
              <div className="image-middle w-40">
                {previewImage2 && <img className="preview" src={previewImage2} alt="" />}
                <input className="image-select" type="file" accept="image/*" onChange={selectFile2} />
              </div>
              <div className="w-50">
                <div className="title mt-2 mb-2">
                  Token economics
                </div>
                <input type="text" className="content w-100" placeholder="Enter description"/>
              </div>
            </div>
        </div>
        <div className="label-input">
          <div></div>
          <div className="button-group">
            <Button onClick={handleSubmit} type="primary">Create a project</Button>
            <Button onClick={closeAdmin} type="primary" danger>Cancel</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
