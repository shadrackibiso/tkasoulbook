import React, { useState } from "react";
import "../css/testimonyForm.css";
import "../css/modal.css";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "@tinymce/tinymce-react";

function SermonForm(props) {
  const [sermonContent, setSermonContent] = useState("");
  const [sermonTitle, setSermonTitle] = useState("");
  const [sermonScriptures, setSermonScriptures] = useState("");
  const [sermonAuthor, setSermonAuthor] = useState("");
  const createTestimony = (e) => {
    e.preventDefault();
    const sermon = {
      id: `${sermonTitle}-${uuidv4()}`,
      title: sermonTitle,
      text: sermonContent,
      scriptures: sermonScriptures,
      author: sermonAuthor,
      createdAt: new Date(),
    };
    props.addSermon(sermon);
    props.closeModal();
  };
  const handleEditorChange = (content, editor) => {
    setSermonContent(content);
  };

  return (
    <div className="Modal row">
      {/* Modal Backdrop */}
      <div
        className="ModalBlind"
        onClick={() => {
          props.closeModal();
        }}
      ></div>
      {/* Modal Content */}
      <div className="ModalContainer sermonModalContainer col-lg-6">
        {/* Modal Header */}
        <div className="ModalHeader">
          <span className="ModalTitle">Add Sermon</span>
          <div
            className="ModalCloseBtn"
            onClick={() => {
              props.closeModal();
            }}
          >
            <MdClose />
          </div>
        </div>
        {/* Main Modal content */}
        <div className="ModalBody SermonModalBody">
          <form onSubmit={createTestimony} className="row no-gutters">
            {/* Sermon Title */}
            <div className="col-12 p-2 pb-0 mb-0">
              <input
                type="text"
                name="sermonTitle"
                onChange={(e) => setSermonTitle(e.target.value)}
                className="sermonFormInput testimonyFormTitle"
                placeholder="Title"
                required
              />
            </div>
            {/* Sermon Content */}
            <div className="col-12 p-2 pt-0 pb-0 mb-0">
              <Editor
                // initialValue=""
                apiKey="55fayqbe456vm8f5okahmp0wsed1ublklo5p5nxnrql7wwe4"
                init={{
                  height: 400,
                  menubar: "file edit insert view format table tools",
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor spellchecker",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar_mode: "floating",
                  toolbar_sticky: true,
                  toolbar:
                    "undo redo | formatselect | bold italic | fullscreen  | \
                    bullist numlist | \
                    alignleft aligncenter | \
                    forecolor | outdent indent | spellchecker |",
                }}
                outputFormat="html"
                onEditorChange={handleEditorChange}
              />
            </div>
            {/* Sermon Scriptures */}
            <div className="col-md-6 p-2 mb-0 pt-0">
              <input
                type="text"
                name="sermonScriptures"
                onChange={(e) => setSermonScriptures(e.target.value)}
                className="sermonFormInput testimonyFormTitle"
                placeholder="Scriptures"
              />
            </div>
            {/* Sermon Author */}
            <div className="col-md-6 p-2 pt-0">
              <input
                type="text"
                name="sermonAuthor"
                onChange={(e) => setSermonAuthor(e.target.value)}
                className="sermonFormInput testimonyFormTitle"
                placeholder="Author"
                required
              />
            </div>
            {/* Send Button */}
            <button className="mainBtn">Publish</button>
          </form>
        </div>
      </div>
      {/* Mobile Close Btn */}
      <div
        className="ModalCloseMobile"
        onClick={() => {
          props.closeModal();
        }}
      >
        close
      </div>
    </div>
  );
}

export default SermonForm;
