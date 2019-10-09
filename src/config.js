const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "" 
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: ""
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "",
    APP_CLIENT_ID: "",
    IDENTITY_POOL_ID: ""
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "image-store-api-prod-attachmentsbucket-5tpvezevme8f"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.lesserimages.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_SzMfZtj5m",
    APP_CLIENT_ID: "5m9q38m8aocef0q9l75q43eod0",
    IDENTITY_POOL_ID: "us-east-1:489f3f46-3be4-419b-a114-6a4f44edac1a"
  }
}

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : prod;

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
}