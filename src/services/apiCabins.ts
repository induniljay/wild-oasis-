import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function deleteCabinAPI(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin, id?: string | number) {
  //https://bbsfgdcrncsbtjtlfvoy.supabase.co/storage/v1/object/sign/cabin-images/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTcwODc5NDM4NSwiZXhwIjoxNzQwMzMwMzg1fQ.GJs25RgSQdfZb_uZ2jNL4fg7-vWcKaM4yPTmE8rubzY&t=2024-02-24T17%3A06%3A26.066Z

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
    /\//g,
    " "
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. create cabin
  let query = supabase.from("cabins");

  //A) create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  //B) edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  //2 upload  image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete cabin if there is storage error.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(storageError);
    throw new Error(
      "Cabin  image could not be  uploaded and the cabin was not created."
    );
  }

  return data;
}
