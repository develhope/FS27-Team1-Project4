import { db } from "../db.js";
import Joi from "joi";

const gearSchema = Joi.object({
  image: Joi.string().allow(null, ""),
  type: Joi.string().valid("Peripheral", "Component").required(),
  gear: Joi.string().required(),
  brand: Joi.string().required(),
  series: Joi.string().required(),
  features: Joi.array().items(Joi.string()),
  originalPrice: Joi.number().greater(0).required(),
  discount: Joi.number().allow(null, "").greater(0),
  linkInfo: Joi.string().allow(null, ""),
  stock: Joi.number().integer().required(),
});

const pcSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string(),
  description: Joi.string().required(),
  originalPrice: Joi.number().required(),
  discount: Joi.number(),
  stock: Joi.number().required(),
});

const stockSchema = Joi.object({
  series: Joi.string(),
  name: Joi.string(),
  stock: Joi.number().required(),
}).or("series", "name");

const brandSchema = Joi.object({
  brand: Joi.string().required(),
});

export async function getGearList(req, res) {
  try {
    const gears = await db.manyOrNone(
      `SELECT
        id,
        type,
        image,
        gear,
        brand,
        series,
        features,
        original_price AS "originalPrice",
        discount,
        link_info AS "linkInfo",
        stock,
        created_at AS "createdAt"
      FROM gear
      WHERE deleted_at IS NULL`
    );

    res.status(200).json(gears);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getComputerList(req, res) {
  try {
    const pc = await db.manyOrNone(
      `SELECT
        id,
        type,
        name,
        image,
        description,
        original_price AS "originalPrice",
        discount,
        stock,
        created_at AS "createdAt"
      FROM pc
      WHERE deleted_at IS NULL`
    );

    res.status(200).json(pc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getGearBySeries(req, res) {
  const { series } = req.params;
  try {
    const gears = await db.oneOrNone(
      `SELECT
        id,
        type,
        image,
        gear,
        brand,
        series,
        features,
        original_price AS "originalPrice",
        discount,
        stock,
        link_info AS "linkInfo",
        created_at AS "createdAt"
      FROM gear
      WHERE series=$1
        AND deleted_at IS NULL`,
      [series]
    );

    if (gears) {
      res.status(200).json(gears);
    } else {
      res.status(404).json({ msg: "Gear not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getComputerByName(req, res) {
  const { name } = req.params;
  try {
    const pc = await db.oneOrNone(
      `SELECT
        id,
        type,
        name,
        image,
        description,
        original_price AS "originalPrice",
        discount,
        stock,
        created_at AS "createdAt"
      FROM pc
      WHERE name=$1
        AND deleted_at IS NULL`,
      [name]
    );

    if (pc) {
      res.status(200).json(pc);
    } else {
      res.status(404).json({ msg: "PC not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function addGear(req, res) {
  const {
    type,
    image,
    gear,
    brand,
    series,
    features,
    originalPrice,
    discount,
    linkInfo,
    stock,
  } = req.body;

  const validatedGear = gearSchema.validate(req.body);

  if (validatedGear.error) {
    return res
      .status(400)
      .json({ msg: validatedGear.error.details[0].message });
  }

  try {
    const newGear = await db.one(
      `INSERT INTO gear (
    type,
    image,
    gear,
    brand,
    series,
    features,
    original_price,
    discount,
    link_info,
    stock
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        type,
        image,
        gear,
        brand,
        series,
        features,
        originalPrice,
        discount,
        linkInfo,
        stock,
      ]
    );

    res
      .status(201)
      .json({ msg: `${newGear.series} added to products list`, gear: newGear });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function addPc(req, res) {
  const { image, name, description, originalPrice, discount, stock } = req.body;

  const validatePc = pcSchema.validate(req.body);

  if (validatePc.error) {
    return res.status(400).json({ msg: validatePc.error.details[0].message });
  }

  try {
    const newPc = await db.one(
      `INSERT INTO pc (
    type,
    image,
    name,
    description,
    original_price,
    discount,
    stock
    )
    VALUES ('PC', $1, $2, $3, $4, $5, $6) RETURNING *`,
      [image, name, description, originalPrice, discount, stock]
    );

    res
      .status(201)
      .json({ msg: `${newPc.name} added to products list`, pc: newPc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function updateGear(req, res) {
  const paramSeries = req.params.series;
  const {
    type,
    image,
    gear,
    brand,
    series,
    features,
    originalPrice,
    discount,
    linkInfo,
    stock,
  } = req.body;

  try {
    const gearValidation = gearSchema.validate(req.body);

    if (gearValidation.error) {
      return res
        .status(400)
        .json({ msg: gearValidation.error.details[0].message });
    }

    const newGear = await db.one(
      `UPDATE gear
       SET image=$11,
          type=$2,
          gear=$3,
          brand=$4,
          series=$5,
          features=$6,
          original_price=$7,
          discount=$8,
          link_info=$9,
          stock=$10
          WHERE series=$1
          RETURNING *`,
      [
        paramSeries,
        type,
        gear,
        brand,
        series,
        features,
        originalPrice,
        discount,
        linkInfo,
        stock,
        image,
      ]
    );

    res.status(201).json({ msg: `${series} updated`, gear: newGear });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function updateGearStock(req, res) {
  const { series } = req.params;
  const { stock } = req.body;

  try {
    const stockValidation = stockSchema.validate({ series, stock });

    if (stockValidation.error) {
      return res
        .status(400)
        .json({ msg: stockValidation.error.details[0].message });
    }

    const newStock = await db.one(
      `UPDATE gear
     SET stock=$2
     WHERE series=$1
     RETURNING stock`,
      [series, stock]
    );

    res
      .status(201)
      .json({ msg: `Updated ${series}'s stock to ${newStock.stock}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function updatePc(req, res) {
  const paramName = req.params.name;
  const { image, name, description, originalPrice, discount, stock } = req.body;

  try {
    const pcValidation = pcSchema.validate(req.body);

    if (pcValidation.error) {
      return res
        .status(400)
        .json({ msg: pcValidation.error.details[0].message });
    }

    const newPc = await db.one(
      `UPDATE pc
       SET image=$2,
           name=$3,
           description=$4,
           original_price=$5,
           discount=$6,
           stock=$7
           WHERE name=$1
           RETURNING *`,
      [paramName, image, name, description, originalPrice, discount, stock]
    );

    res.status(201).json({ msg: `${name} updated`, gear: newPc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function updatePcStock(req, res) {
  const { name } = req.params;
  const { stock } = req.body;

  try {
    const stockValidation = stockSchema.validate({ name, stock });

    if (stockValidation.error) {
      return res
        .status(400)
        .json({ msg: stockValidation.error.details[0].message });
    }

    const newStock = await db.one(
      `UPDATE pc
       SET stock=$2
       WHERE name=$1
       RETURNING stock`,
      [name, stock]
    );

    res
      .status(201)
      .json({ msg: `Updated ${name}'s stock to ${newStock.stock}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function deleteGear(req, res) {
  const { series } = req.params;

  try {
    db.none(
      `UPDATE gear
       SET deleted_at=NOW()
       WHERE series=$1`,
      [series]
    );

    res.status(201).json({ msg: `${series} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function deletePc(req, res) {
  const { name } = req.params;

  try {
    db.none(
      `UPDATE pc
       SET deleted_at=NOW()
       WHERE name=$1`,
      [name]
    );

    res.status(201).json({ msg: `${name} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getAllBrands(req, res) {
  try {
    const brands = await db.manyOrNone(
      `SELECT id, brand
      FROM brands
      WHERE deleted_at IS NULL
      ORDER BY id`
    );

    res.status(200).json(brands);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function addBrand(req, res) {
  const { brand } = req.body;

  try {
    const brandValidation = brandSchema.validate(req.body);

    if (brandValidation.error) {
      return res
        .status(400)
        .json({ msg: brandValidation.error.details[0].message });
    }

    const newBrand = await db.one(
      `INSERT INTO brands (brand)
      VALUES ($1)
      RETURNING brand`,
      [brand]
    );

    res
      .status(201)
      .json({ msg: `${newBrand.brand} added`, brand: newBrand.brand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function updateBrand(req, res) {
  const { id } = req.params;
  const { brand } = req.body;

  try {
    const brandValidation = brandSchema.validate(req.body);

    if (brandValidation.error) {
      return res
        .status(400)
        .json({ msg: brandValidation.error.details[0].message });
    }

    const updatedBrand = await db.one(
      `UPDATE brands
      SET brand=$2
      WHERE id=$1
      RETURNING brand`,
      [id, brand]
    );

    res.status(200).json({
      msg: `${updatedBrand.brand} updated`,
      brand: updatedBrand.brand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function deleteBrand(req, res) {
  const { id } = req.params;

  try {
    const deletedBrand = await db.one(
      `UPDATE brands
      SET deleted_at=NOW()
      WHERE id=$1
      RETURNING brand`,
      [id]
    );

    res.status(200).json({msg: `${deletedBrand.brand} deleted`})
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}
