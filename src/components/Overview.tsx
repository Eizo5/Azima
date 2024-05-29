import "../Styles/settings.css";
import { Event } from "./Event";
import OurButton from "./OurButton";
import imgHolder from "../assets/EventImage.png";
import { InputText } from "./InputText";
import { InputDesc } from "./InputDesc";
import Checkbox from "./Checkbox";
import Dropdown from "../components/Dropdown";
import useGroup from "../hooks/groupHook";
import { Group } from "../data/types";
import CloudinaryUploadWidget from "../components/UploadImage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Overview = () => {
  const { categories, updateGroup, getGroup } = useGroup();
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dkgrr55re");
  const [uploadPreset] = useState("v6wusflm");
  const { id } = useParams();
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });
  const [defaultCategories, setDefaultCategories] = useState<
    { value: string; label: string; category_id: number }[]
  >([]);

  const [groupData, setGroupData] = useState({
    name: "",
    location: "",
    description: "",
    group_image: "",
    is_adult_only: false,
    is_private_group: false,
    is_online: false,
    is_f2f: false,
    categories: [],
  });

  const handleInputChange = (e: any) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = (e: any) => {
    e.preventDefault();

    updateGroup(groupData);
  };

  useEffect(() => {
    getGroup(id).then((res) => {
      setGroupData({
        ...res,
        categories: res.categories.map(({ category_id }) => category_id),
      });
      setDefaultCategories(
        res?.categories?.map(({ category_id, name }) => ({
          value: name,
          label: name,
          category_id,
        }))
      );
    });
  }, []);

  useEffect(() => {
    // Fetch the profile image URL using the publicId and update the image source
    if (publicId) {
      // Construct the Cloudinary image URL with the publicId
      const baseUrl = "https://res.cloudinary.com/dkgrr55re/image/upload/";
      const imageUrl = `${baseUrl}${publicId}`;

      // Update the image source in groupData
      setGroupData({ ...groupData, group_image: imageUrl });
    }
  }, [publicId]);

  return (
    <div>
      <h1 className="settings-header">Overview</h1>
      <form onSubmit={handleSaveClick}>
        <div className="group-image-name-container">
          <div className="account-image">
            <img src={groupData ? groupData?.group_image : imgHolder} />
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
            />
          </div>
          <div className="group-name-container">
            <InputText
              label="Group Name"
              placeholder={groupData?.name}
              name="name"
              onChange={handleInputChange}
              defaultValue={groupData?.name}
            />
          </div>
        </div>
        <div className="description-overview-container">
          <InputDesc
            label="Description"
            placeholder={groupData?.description}
            name="description"
            defaultValue={groupData?.description}
            onChange={handleInputChange}
            isTextArea
          />
        </div>
        <div className="checkboxes-dropdowns-container">
          <div className="checkboxes-overview-container">
            <Checkbox
              label="Allow adults only"
              checked={groupData && groupData?.is_adult_only}
              onChange={() =>
                setGroupData({
                  ...groupData,
                  is_adult_only: !groupData?.is_adult_only,
                })
              }
            />
            <Checkbox
              label="I want my group to be private"
              checked={groupData && groupData?.is_private_group}
              onChange={() =>
                setGroupData({
                  ...groupData,
                  is_private_group: !groupData?.is_private_group,
                })
              }
            />
          </div>
          <div className="dropdowns-overview">
            <Dropdown
              list={[
                { value: "online", label: "Online" },
                { value: "f2f", label: "f2f" },
              ]}
              onChange={(options: any) =>
                setGroupData({
                  ...groupData,
                  is_f2f: options.some((option: any) => option.value === "f2f"),
                  is_online: options.some(
                    (option) => option.value === "online"
                  ),
                })
              }
              multiSelect={true}
              label="Events Type"
            />

            <Dropdown
              list={categories}
              multiSelect={true}
              label="Group Type"
              value={defaultCategories}
              onChange={(option) => {
                setGroupData({
                  ...groupData,
                  categories: option.map(({ category_id }) => category_id),
                });
                setDefaultCategories(option);
              }}
            />
          </div>
        </div>
        <OurButton position="right" label="Save" type="submit" />
      </form>
    </div>
  );
};

export default Overview;
