import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Plus } from "lucide-react";
import { IParamsProduct } from "../types";
import { api } from "../api/axios";
import { urls } from "../api/urls";
import { toast } from "@/hooks/use-toast";

export function CreateProduct() {
  const [isOpen, setOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(""); // Для добавления нового URL

  const initialValues: IParamsProduct = {
    title: "",
    desc: "",
    price: "",
    img: [], // Массив строк для URL
  };

  const validate = (values: IParamsProduct) => {
    const errors: Partial<IParamsProduct> = {};
    if (!values.title) {
      errors.title = "Название продукта обязательно";
    }
    if (!values.price) {
      errors.price = "Цена обязательна";
    } else if (isNaN(Number(values.price))) {
      errors.price = "Цена должна быть числом";
    }
    if (values.img.length === 0) {
      (errors.img as any) = "Необходимо добавить хотя бы одно изображение";
    }
    return errors;
  };

  const handleSubmit = (values: IParamsProduct, { setSubmitting }: any) => {
    api(urls.product.post, values, "POST")
      .then(() => toast({ title: "продукт создан", variant: "default" }))
      .catch((e) =>
        toast({
          title: `ошибка при создании товара ${e.messate}`,
          variant: "destructive",
        })
      );
    console.log("Submitted values:", values);
    setSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline">
          создать продукт
          <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="title">Название продукта</label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Введите название"
                  className="w-full h-8 px-3 shadow-sm border border-gray-500 rounded-sm"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="desc">Описание</label>
                <Field
                  id="desc"
                  name="desc"
                  as="textarea"
                  placeholder="Введите описание"
                  className="w-full h-20 px-3 shadow-sm border border-gray-500 rounded-sm"
                />
              </div>

              <div>
                <label htmlFor="price">Цена</label>
                <Field
                  id="price"
                  name="price"
                  type="text"
                  placeholder="Введите цену"
                  className="w-full h-8 px-3 shadow-sm border border-gray-500 rounded-sm"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="img">Добавить URL изображения</label>
                <div className="flex gap-2">
                  <input
                    id="img"
                    type="text"
                    placeholder="Введите URL изображения"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full h-8 px-3 shadow-sm border border-gray-500 rounded-sm"
                  />
                  <button
                    type="button"
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => {
                      if (newImageUrl.trim()) {
                        setFieldValue("img", [
                          ...values.img,
                          newImageUrl.trim(),
                        ]);
                        setNewImageUrl(""); // Очищаем поле
                      }
                    }}
                  >
                    Добавить
                  </button>
                </div>
                <ErrorMessage
                  name="img"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {values.img.length > 0 && (
                <div>
                  <p className="mb-2">Список изображений:</p>
                  <ul className="space-y-2">
                    {values.img.map((url, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <img
                          src={url}
                          alt={`Изображение ${index + 1}`}
                          className="w-16 h-16 object-cover border rounded-md"
                        />
                        <span className="text-sm">
                          {url.length > 149 ? url.slice(0, 150) + "..." : url}
                        </span>
                        <button
                          type="button"
                          className="text-red-600 text-sm underline"
                          onClick={() =>
                            setFieldValue(
                              "img",
                              values.img.filter((_, i) => i !== index)
                            )
                          }
                        >
                          Удалить
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Сохранить
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
