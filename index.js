import express from "express";
import axios from "axios";
import cors from "cors";

const PORT = process.env.PORT ?? 2000;
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

app.post("/down", function (req, res) {
  console.log(req.body.walletId);
  var data = JSON.stringify({
    customerId: req.body.customerId,
    organizationId: req.body.organizationId,
    walletId: "5f850000-90a3-0025-25c7-08d9875bb74f",
    sum: req.body.sum,
  });

  var config = {
    method: "post",
    url: `https://iiko.biz:9900/api/0/customers/refill_balance?access_token=${req.body.token}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      res.json(error);
    });
});

app.post("/addbonus", function (req, res) {
  var data = JSON.stringify({
    customerId: req.body.customerId,
    organizationId: req.body.organizationId,
    walletId: req.body.walletId,
    sum: req.body.bonus,
  });

  var config = {
    method: "post",
    url: `https://iiko.biz:9900/api/0/customers/refill_balance?access_token=${req.body.token}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      res.json(error);
    });
});
app.post("/addcategory", function (req, res) {
  console.log(req.body);

  var config = {
    method: "post",
    url: `https://iiko.biz:9900/api/0/customers/${req.body.idUser}/add_category?access_token=${req.body.token}&organization=${req.body.org_id}&categoryId=${req.body.idCategory}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(200);
    })
    .catch(function (error) {
      res.json(error);
    });
});
app.post("/getcategory", function (req, res) {
  console.log(req.body);
  var config = {
    method: "get",
    url: `https://iiko.biz:9900/api/0/organization/${req.body.org_id}/guest_categories?access_token=${req.body.token}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    });
});
app.post("/getuser", function (req, res) {
  var config = {
    method: "get",
    url: `https://iiko.biz:9900/api/0/customers/get_customer_by_phone?access_token=${req.body.token}&organization=${req.body.org_id}&phone=${req.body.number}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.post("/gettoken", function (req, res) {
  console.log(req.body);
  var config = {
    method: "get",
    url: "https://iisko.biz:9900/api/0/auth/access_token?user_id=Bruxxspb&user_secret=Bruxxspb123",
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios(config)
    .then(function (response) {
      const otv = {
        token: response.data,
        status: 200,
      };
      res.json(otv);
    })
    .catch(function (error) {
      res.json(300);
    });
});

app.listen(PORT, () => {
  console.log(`server starte port ${PORT}`);
});
