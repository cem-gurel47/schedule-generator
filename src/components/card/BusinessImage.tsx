/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react";
import { BusinessContext } from "@contexts/index";
import { trpc } from "@utils/trpc";
import { ErrorAlert, SuccessAlert } from "../alert";
import AWS from "aws-sdk";
import { XMarkIcon } from "@heroicons/react/24/outline";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  params: {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  },
});

const BusinessImage = () => {
  const { image, setImage } = useContext(BusinessContext);
  const [error, setError] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const { mutate, isLoading, data } =
    trpc.business.updateBusinessImage.useMutation();

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64Image(reader.result as string);
    };
  };

  const onUpload = async () => {
    if (!base64Image || !file) return;
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: file.name,
      ContentType: file.type,
    } as AWS.S3.PutObjectRequest;

    s3.putObject(params, (err) => {
      if (err) {
        setError(err.message);
      } else {
        mutate(
          {
            imageLink: `https://s3.amazonaws.com/scheduler.v0/${file.name}`,
          },
          {
            onSuccess: () => {
              setImage(`https://s3.amazonaws.com/scheduler.v0/${file.name}`);
              setBase64Image(null);
              setFile(null);
            },
          }
        );
      }
    });
  };

  const getImage = () => {
    if (base64Image) {
      return base64Image;
    }
    if (image) {
      return image;
    }
    return "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg";
  };

  const imageSrc = getImage();

  return (
    <div className="card-compact card relative flex h-full items-center justify-center bg-base-100 shadow-2xl">
      <div className="card-body w-full">
        {!data && base64Image && (
          <div className="absolute top-0 right-0">
            <button
              className=" btn-error btn-sm btn"
              onClick={() => setBase64Image(null)}
            >
              REMOVE PREVIEW IMAGE
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
        <figure>
          <img
            src={imageSrc}
            alt="business_logo"
            className="mb-2 w-full object-contain object-top"
          />
        </figure>
      </div>
      <div className="card-actions w-full">
        <input
          type="file"
          className="file-input"
          onChange={onFileSelect}
          accept="image/png, image/jpeg"
        />
        <button
          className={`btn-primary btn w-full ${isLoading && "loading"}`}
          disabled={!base64Image}
          onClick={onUpload}
        >
          Upload Image
        </button>
        {error && (
          <ErrorAlert error="Error" description={error} setError={setError} />
        )}
        {data && <SuccessAlert title="Success!" description="Image Updated" />}
      </div>
    </div>
  );
};

export default BusinessImage;

// {
// 	"Version": "2012-10-17",
// 	"Id": "Policy1648807206642",
// 	"Statement": [
// 		{
// 			"Sid": "Stmt1648807205338",
// 			"Effect": "Allow",
// 			"Principal": "*",
// 			"Action": "s3:*",
// 			"Resource": [
// 				"arn:aws:s3:::scheduler.v0",
// 				"arn:aws:s3:::scheduler.v0/*"
// 			]
// 		}
// 	]
// }
