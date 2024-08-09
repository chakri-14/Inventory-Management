import express from "express";
import ProductModel from "../models/product_model.js";
import HistoryModel from "../models/history_model.js";
import Product from "../models/product_model.js";

const analyticsRoutes = express.Router();

// Route to get products used by admin only with pagination
analyticsRoutes.get("/admin-used", async (req, res) => {
  try {
    const { page = 1, itemsperpage = 10 } = req.query;

    const pageInt = parseInt(page);
    const itemsPerPageInt = parseInt(itemsperpage);
    const skipItems = (pageInt - 1) * itemsPerPageInt;

    const query = { user: "admin" };
    const totalCount = await Product.find(query).countDocuments();
    const pages_count = Math.ceil(totalCount / itemsPerPageInt);

    const adminUsedProducts = await Product.find(query)
      .skip(skipItems)
      .limit(itemsPerPageInt)
      .populate({
        path: "history",
        populate: {
          path: "location",
        },
      })
      .populate("manufacturer")
      .sort({ dateOfPurchase: -1 });

    res.status(200).json({
      data: adminUsedProducts,
      pages_count,
      currentPage: pageInt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

analyticsRoutes.get("/used-by-department", async (req, res) => {
  try {
    const { page = 1, itemsperpage = 10 } = req.query;

    const pageInt = parseInt(page);
    const itemsPerPageInt = parseInt(itemsperpage);
    const skipItems = (pageInt - 1) * itemsPerPageInt;

    const query = { user: "department" };
    const totalCount = await Product.find(query).countDocuments();
    const pages_count = Math.ceil(totalCount / itemsPerPageInt);

    const adminUsedProducts = await Product.find(query)
      .skip(skipItems)
      .limit(itemsPerPageInt)
      .populate({
        path: "history",
        populate: {
          path: "location",
        },
      })
      .populate("manufacturer")
      .sort({ dateOfPurchase: -1 });

    res.status(200).json({
      data: adminUsedProducts,
      pages_count,
      currentPage: pageInt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
analyticsRoutes.get("/used-by-normal-user", async (req, res) => {
  try {
    const { page = 1, itemsperpage = 10 } = req.query;

    const pageInt = parseInt(page);
    const itemsPerPageInt = parseInt(itemsperpage);
    const skipItems = (pageInt - 1) * itemsPerPageInt;

    const query = { user: "admin" };
    const totalCount = await Product.find(query).countDocuments();
    const pages_count = Math.ceil(totalCount / itemsPerPageInt);

    const adminUsedProducts = await Product.find(query)
      .skip(skipItems)
      .limit(itemsPerPageInt)
      .populate({
        path: "history",
        populate: {
          path: "location",
        },
      })
      .populate("manufacturer")
      .sort({ dateOfPurchase: -1 });

    res.status(200).json({
      data: adminUsedProducts,
      pages_count,
      currentPage: pageInt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

analyticsRoutes.get("/repair-status", async (req, res) => {
  try {
    const { page = 1, itemsperpage = 10 } = req.query;

    const pageInt = parseInt(page);
    const itemsPerPageInt = parseInt(itemsperpage);
    const skipItems = (pageInt - 1) * itemsPerPageInt;

    const repairStatusProducts = await Product.find({
      history: {
        $elemMatch: {
          status: {
            $elemMatch: {
              name: "repair",
            },
          },
        },
      },
    })
      .skip(skipItems)
      .limit(itemsPerPageInt)
      .populate({
        path: "history",
        populate: {
          path: "location",
        },
      })
      .populate("manufacturer")
      .sort({ dateOfPurchase: -1 });

    const totalCount = await Product.find({
      history: {
        $elemMatch: {
          status: {
            $elemMatch: {
              name: "warranty",
            },
          },
        },
      },
    }).countDocuments();
    const pages_count = Math.ceil(totalCount / itemsPerPageInt);

    console.log(repairStatusProducts, totalCount);
    res.status(200).json({
      data: repairStatusProducts,
      pages_count,
      currentPage: pageInt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get expiring products
analyticsRoutes.get("/expiring", async (req, res) => {
  try {
    const { months = 0 } = req.query; // Default to 1 month if not specified
    const expiringProducts = await getExpiringProducts(parseInt(months));
    res.status(200).json(expiringProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to get expiring products
const getExpiringProducts = async (months) => {
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + months);

  const expiringProducts = await Product.find({
    $and: [
      {
        $expr: {
          $lte: [
            {
              $add: [
                "$dateOfPurchase",
                {
                  $multiply: ["$warrantyMonths", 30 * 24 * 60 * 60 * 1000], // Convert warranty months to milliseconds
                },
              ],
            },
            futureDate,
          ],
        },
      },
    ],
  })
    .populate("createdBy")
    .populate({
      path: "history",
      populate: {
        path: "location",
      },
    })
    .populate("manufacturer")
    .sort({ dateOfPurchase: -1 });
  return expiringProducts;
};

analyticsRoutes.get("/", async (req, res) => {
  try {
    const useby = await getProductUsageByUser();
    const expiry = await getWarrantyStatus();
    const status = await getProductStatus();

    const analytics = { useby, expiry, status };

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
analyticsRoutes.get("/in-warranty-products", async (req, res) => {
  try {
    const { page = 1, itemsperpage = 10 } = req.query;
    const pageInt = parseInt(page);
    const itemsPerPageInt = parseInt(itemsperpage);
    const skipItems = (pageInt - 1) * itemsPerPageInt;
    const currentDate = new Date();

    const inWarrantyProducts = await Product.aggregate([
      {
        $addFields: {
          warrantyExpiryDate: {
            $add: [
              "$dateOfPurchase",
              { $multiply: ["$warrantyMonths", 30 * 24 * 60 * 60 * 1000] }, // Convert warranty months to milliseconds
            ],
          },
        },
      },
      {
        $match: {
          warrantyExpiryDate: { $gte: currentDate },
        },
      },
      {
        $sort: { dateOfPurchase: -1 },
      },
      {
        $facet: {
          totalData: [
            { $skip: skipItems },
            { $limit: itemsPerPageInt },
            {
              $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdBy",
              },
            },
            {
              $lookup: {
                from: "companies",
                localField: "manufacturer",
                foreignField: "_id",
                as: "manufacturer",
              },
            },
            {
              $lookup: {
                from: "histories",
                localField: "history",
                foreignField: "_id",
                as: "history",
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const products = inWarrantyProducts[0].totalData;
    const totalCount = inWarrantyProducts[0].totalCount[0]
      ? inWarrantyProducts[0].totalCount[0].count
      : 0;
    const pagesCount = Math.ceil(totalCount / itemsPerPageInt);

    res.status(200).json({
      data: products,
      pagesCount,
      currentPage: pageInt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
analyticsRoutes.get("/not-in-warranty-products", async (req, res) => {
  try {
    const { page = 1, itemsperpage = 10 } = req.query;
    const pageInt = parseInt(page);
    const itemsPerPageInt = parseInt(itemsperpage);
    const skipItems = (pageInt - 1) * itemsPerPageInt;
    const currentDate = new Date();

    const notInWarrantyProducts = await Product.aggregate([
      {
        $addFields: {
          warrantyExpiryDate: {
            $add: [
              "$dateOfPurchase",
              { $multiply: ["$warrantyMonths", 30 * 24 * 60 * 60 * 1000] }, // Convert warranty months to milliseconds
            ],
          },
        },
      },
      {
        $match: {
          warrantyExpiryDate: { $lt: currentDate },
        },
      },
      {
        $sort: { dateOfPurchase: -1 },
      },
      {
        $facet: {
          totalData: [
            { $skip: skipItems },
            { $limit: itemsPerPageInt },
            {
              $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdBy",
              },
            },
            {
              $lookup: {
                from: "companies",
                localField: "manufacturer",
                foreignField: "_id",
                as: "manufacturer",
              },
            },
            {
              $lookup: {
                from: "histories",
                localField: "history",
                foreignField: "_id",
                as: "history",
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const products = notInWarrantyProducts[0].totalData;
    const totalCount = notInWarrantyProducts[0].totalCount[0]
      ? notInWarrantyProducts[0].totalCount[0].count
      : 0;
    const pagesCount = Math.ceil(totalCount / itemsPerPageInt);

    res.status(200).json({
      data: products,
      pagesCount,
      currentPage: pageInt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Function to get product usage by user
const getProductUsageByUser = async () => {
  const result = await ProductModel.aggregate([
    {
      $group: {
        _id: "$user",
        count: { $sum: 1 },
      },
    },
  ]);

  const labels = result.map((item) => item._id);
  const data = result.map((item) => item.count);

  return { title: "Products used by", labels, data };
};

// Function to get warranty status
const getWarrantyStatus = async () => {
  const currentDate = new Date();

  const result = await Product.aggregate([
    {
      $project: {
        status: {
          $cond: [
            {
              $gte: [
                {
                  $add: [
                    "$dateOfPurchase",
                    {
                      $multiply: ["$warrantyMonths", 30 * 24 * 60 * 60 * 1000], // Convert warranty months to milliseconds
                    },
                  ],
                },
                currentDate,
              ],
            },
            "in warranty",
            "not in warranty",
          ],
        },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const labels = result.map((item) => item._id);
  const data = result.map((item) => item.count);

  return { title: "Warranty", labels, data };
};

// Function to get product status
const getProductStatus = async () => {
  const result = await HistoryModel.aggregate([
    {
      $unwind: "$status",
    },
    {
      $group: {
        _id: "$status.name",
        count: { $sum: 1 },
      },
    },
  ]);
   

  const labels = result.map((item) => item._id);

  const data = result.map((item) => item.count);

  return { title: "Product Status", labels, data };
};

export default analyticsRoutes;
