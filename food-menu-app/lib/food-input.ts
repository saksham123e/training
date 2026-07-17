import "server-only";

import { categories } from "@/lib/categories";
import type { FoodCreateData } from "@/lib/foods";

type ParseResult<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: string;
    };

const categoryNames = new Set(categories.map((category) => category.name));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseString(value: unknown, field: string): ParseResult<string> {
  if (typeof value !== "string" || value.trim().length === 0) {
    return {
      ok: false,
      error: `${field} is required`,
    };
  }

  return {
    ok: true,
    data: value.trim(),
  };
}

function parseNumber(
  value: unknown,
  field: string,
  options: { min: number; max?: number }
): ParseResult<number> {
  const number = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(number) || number < options.min) {
    return {
      ok: false,
      error: `${field} must be a valid number`,
    };
  }

  if (options.max !== undefined && number > options.max) {
    return {
      ok: false,
      error: `${field} must be ${options.max} or less`,
    };
  }

  return {
    ok: true,
    data: number,
  };
}

export function parseFoodInput(body: unknown): ParseResult<FoodCreateData> {
  if (!isRecord(body)) {
    return {
      ok: false,
      error: "Request body must be an object",
    };
  }

  const name = parseString(body.name, "name");
  const category = parseString(body.category, "category");
  const image = parseString(body.image, "image");
  const price = parseNumber(body.price, "price", { min: 0 });
  const rating = parseNumber(body.rating, "rating", { min: 0, max: 5 });

  if (!name.ok) return name;
  if (!category.ok) return category;
  if (!image.ok) return image;
  if (!price.ok) return price;
  if (!rating.ok) return rating;

  if (!categoryNames.has(category.data)) {
    return {
      ok: false,
      error: "category is not supported",
    };
  }

  return {
    ok: true,
    data: {
      name: name.data,
      category: category.data,
      image: image.data,
      price: price.data,
      rating: rating.data,
    },
  };
}

export function parseFoodPatchInput(
  body: unknown
): ParseResult<Partial<FoodCreateData>> {
  if (!isRecord(body)) {
    return {
      ok: false,
      error: "Request body must be an object",
    };
  }

  const data: Partial<FoodCreateData> = {};

  if ("name" in body) {
    const name = parseString(body.name, "name");
    if (!name.ok) return name;
    data.name = name.data;
  }

  if ("category" in body) {
    const category = parseString(body.category, "category");
    if (!category.ok) return category;

    if (!categoryNames.has(category.data)) {
      return {
        ok: false,
        error: "category is not supported",
      };
    }

    data.category = category.data;
  }

  if ("image" in body) {
    const image = parseString(body.image, "image");
    if (!image.ok) return image;
    data.image = image.data;
  }

  if ("price" in body) {
    const price = parseNumber(body.price, "price", { min: 0 });
    if (!price.ok) return price;
    data.price = price.data;
  }

  if ("rating" in body) {
    const rating = parseNumber(body.rating, "rating", { min: 0, max: 5 });
    if (!rating.ok) return rating;
    data.rating = rating.data;
  }

  if (Object.keys(data).length === 0) {
    return {
      ok: false,
      error: "At least one food field is required",
    };
  }

  return {
    ok: true,
    data,
  };
}
