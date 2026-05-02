```md
# Smart Waste Classifier API

## Endpoint

**POST**
```

[https://mushfiqazam-smart-waste-image-classifier-02.hf.space/predict](https://mushfiqazam-smart-waste-image-classifier-02.hf.space/predict)

```

---

## Request

### Content-Type
```

multipart/form-data

````

### Body Parameters

| Key  | Type | Required | Description        |
|------|------|----------|--------------------|
| file | File | Yes      | Image (jpg/png)    |

---

## Example Request (JavaScript)

```javascript
const formData = new FormData();
formData.append("file", file);

fetch("https://mushfiqazam-smart-waste-image-classifier-02.hf.space/predict", {
  method: "POST",
  body: formData,
})
  .then(res => res.json())
  .then(data => console.log(data));
````

---

## Example Request (cURL)

```bash
curl -X POST https://mushfiqazam-smart-waste-image-classifier-02.hf.space/predict \
  -F "file=@image.jpg"
```

---

## Success Response

```json
{
  "prediction": "plastic_bottle",
  "confidence": 96.34,
  "info": "Plastic bottle – recyclable ♻️"
}
```

---

## Response Fields

| Field      | Type   | Description                       |
| ---------- | ------ | --------------------------------- |
| prediction | string | Predicted waste category          |
| confidence | number | Confidence score (percentage)     |
| info       | string | Description of the waste category |

---

## Error Responses

### Missing File

```json
{
  "detail": "Field required"
}
```

### Invalid Request

```json
{
  "detail": "There was an error parsing the body"
}
```

---

## Notes

* The request must include a file with key name **`file`**
* Only image files (jpg, png) are supported

```
```
