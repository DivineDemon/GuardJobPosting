const jwt = require("jsonwebtoken");
const { connection } = require("../db");

const SECRET = "guard-recruiting-app" || process.env.SECRET;

const guardProfile = (req, res) => {
  const guardProfile = {};
  const { id } = req.params; // guard ID
  try {
    let isAdmin = 0;
    if (isAdmin === 0) {
      connection.query(
        `SELECT 'guard' AS tablename, guard.* FROM guard WHERE guardID=${id}
        UNION
        SELECT 'guardaddress' AS tablename, guardaddress.*, Null as col6, Null as col7, Null as col8, Null as col9, Null as col10, Null as col11, Null as col12, Null as col13, Null as col14, Null as col15, Null as col16 FROM guardaddress WHERE fk_guard=${id}
        UNION
        SELECT 'document' as tablename, document.* FROM document WHERE fk_guard=${id}
        UNION
        SELECT 'otherdocs' AS tablename, otherdocs.*, Null as col5, Null as col6, Null as col7, Null as col8, Null as col9, Null as col10, Null as col11, Null as col12, Null as col13, Null as col14, Null as col15, Null as col16 FROM otherdocs WHERE fk_guard=${id}
        UNION
        SELECT 'bank' AS tablename, bank.*, Null as col8, Null as col9, Null as col10, Null as col11, Null as col12, Null as col13, Null as col14, Null as col15, Null as col16 FROM bank WHERE guard_id=${id}`,
        function (err, rows) {
          if (!err) {
            const guardToken = jwt.sign(
              {
                id: rows[0].guardID,
                isAdmin: rows[0].isAdmin,
                isGuard: rows[0].isGuard,
                isCompany: rows[0].isCompany,
              },
              SECRET,
              {
                expiresIn: "3d",
              }
            );

            let guard = null,
              address = null,
              documents = null,
              otherdocs = null,
              bank = null;
            rows.forEach((row) => {
              switch (row.tablename) {
                case "guard":
                  guard = {
                    guardID: row.guardID,
                    firstName: row.firstName,
                    middleName: row.middleName,
                    lastName: row.lastName,
                    email: row.email,
                    password: row.password,
                    phone: row.phone,
                    dob: row.dob,
                    gender: row.gender,
                    emergencyContact: row.emergencyContact,
                  };
                  break;
                case "guardaddress":
                  address = {
                    state: rows[1].firstName,
                    city: rows[1].middleName,
                    postalCode: rows[1].lastName,
                  };
                  break;
                case "document":
                  documents = {
                    four82: rows[2].firstName,
                    PCR: rows[2].middleName,
                    CPR: rows[2].lastName,
                    CrowdControl: rows[2].email,
                    License: rows[2].password,
                    Firearms: rows[2].phone,
                    FirstAid: rows[2].dob,
                    MediCare: rows[2].gender,
                    Passport: rows[2].status,
                    ResponsibleAlcohol: rows[2].isAdmin,
                    Visa: rows[2].admin_id,
                    WhiteCard: rows[2].address_id,
                    YellowCard: rows[2].isGuard,
                    WorkingWithChildren: rows[2].isCompany,
                  };
                  break;
                case "otherdocs":
                  otherdocs = {
                    name: rows[3].firstName,
                    document: rows[3].middleName,
                  };
                  break;
                case "bank":
                  bank = {
                    bankName: rows[4].firstName,
                    accountTitle: rows[4].middleName,
                    accountNo: rows[4].lastName,
                    bsb: rows[4].email,
                    abn: rows[4].password,
                  };
                  break;
              }
            });

            res.status(201).json({
              status: true,
              message: "Got Guard Profile!",
              guardProfile: {
                guard,
                address,
                documents,
                otherDocs,
                bank,
              },
              guardToken,
            });
          } else {
            res
              .status(404)
              .json({ success: false, message: "Guard Not Found!" });
          }
        }
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const companyProfile = (req, res) => {
  try {
    const { id } = req.params; // company ID
    let isAdmin = 0;
    if (isAdmin === 0) {
      connection.query(
        `SELECT company.companyID, company.companyName, company.phone, company.email, company.isAdmin, company.isCompany, company.isGuard, companyaddress.state, companyaddress.city, companyaddress.postalCode, paymentcard.cardNumber, paymentcard.expDate, paymentcard.cvv FROM company INNER JOIN companyaddress ON companyaddress.fk_company = company.companyID INNER JOIN paymentcard ON paymentcard.fk_company = company.companyID WHERE company.companyID = ${id}`,
        function (err, rows) {
          if (!err) {
            const companyToken = jwt.sign(
              {
                id: rows[0].companyID,
                isAdmin: rows[0].isAdmin,
                isGuard: rows[0].isGuard,
                isCompany: rows[0].isCompany,
              },
              SECRET,
              {
                expiresIn: "3d",
              }
            );
            const paymentCards = [];
            rows.forEach((row, i) => {
              const card = {
                cardNumber: rows[i].cardNumber,
                expDate: rows[i].expDate,
                cvv: rows[i].cvv,
              };
              paymentCards.push(card);
            });
            res.status(201).json({
              success: true,
              message: "Company Logged In!",
              companyProfile: {
                company: {
                  companyID: rows[0].companyID,
                  companyName: rows[0].companyName,
                  phone: rows[0].phone,
                  email: rows[0].email,
                  state: rows[0].state,
                  city: rows[0].city,
                  postalCode: rows[0].postalCode,
                },
                paymentCards,
              },
              companyToken,
            });
          } else {
            res
              .status(404)
              .json({ success: false, message: "Company Not Found!" });
          }
        }
      );
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = {
  guardProfile,
  companyProfile,
};
