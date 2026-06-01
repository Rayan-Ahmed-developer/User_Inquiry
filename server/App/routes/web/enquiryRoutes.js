let express = require('express');
const { enquiryInsert,enquiryList,enquiryDelete,enquirysingleRow,enquiryUpdate} = require('../../controllers/web/enquiryController');
let enquiryRouter = express.Router();

enquiryRouter.post("/insert", enquiryInsert);
enquiryRouter.get("/view",enquiryList);
enquiryRouter.delete("/delete/:id",enquiryDelete);
enquiryRouter.get("/single/:id",enquirysingleRow); //single row ki id nkal k deti h
enquiryRouter.put("/update/:id",enquiryUpdate); //update k liye bhi insert function use kr skte h kyuki dono me same cheeze hoti h bas update me id bhi pass krni hoti h

module.exports = enquiryRouter;