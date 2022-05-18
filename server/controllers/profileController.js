import jwt from "jsonwebtoken";
import { connection } from "../db.js";

const SECRET = "guard-recruiting-app" || process.env.SECRET;

export const guardProfile = (req, res) => {
  try {
    const { id } = req.params; // guard ID
    let isAdmin = 0;
    if (isAdmin === 0) {
      connection.query(
        `SELECT guard.guardID, guard.firstName, guard.middleName, guard.lastName, guard.email, guard.password, guard.phone, guard.dob, guard.gender, guard.emergencyContact, guard.isAdmin, guard.isGuard, guard.isCompany, guardaddress.guardAddressId, guardaddress.state, guardaddress.city, guardaddress.postalCode, document.documentID, document.four82, document.PCR, document.CPR, document.CrowdControl, document.License, document.Firearms, document.FirstAid, document.FirstAid, document.MediCare, document.Passport, document.ResponsibleAlcohol, document.Visa, document.WhiteCard, document.YellowCard, document.WorkingWithChildren, otherdocs.otherDocsId, otherdocs.name, otherdocs.document, bank.bankID, bank.bankName, bank.accountTitle, bank.accountNo, bank.bsb, bank.abn, shift.shiftID, shift.startTime, shift.endTime, shift.date FROM guard INNER JOIN guardaddress ON guard.guardID = guardaddress.fk_guard INNER JOIN document ON document.fk_guard = guard.guardID INNER JOIN bank ON bank.guard_id = guard.guardID INNER JOIN otherdocs ON otherdocs.fk_guard = guard.guardID INNER JOIN shift ON shift.fk_guard = guard.guardID WHERE guard.guardID=${id}`,
        function (err, rows) {
          if (!err) {
            const accessToken = jwt.sign(
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
            res.status(201).json({
              success: true,
              message: "Guard Logged In!",
              profile: {
                guard: {
                  guardID: rows[0].guardID,
                  firstName: rows[0].firstName,
                  middleName: rows[0].middleName,
                  lastName: rows[0].lastName,
                  email: rows[0].email,
                  password: rows[0].password,
                  phone: rows[0].phone,
                  dob: rows[0].dob,
                  gender: rows[0].gender,
                  emergencyContact: rows[0].emergencyContact,
                },
                address: {
                  state: rows[0].state,
                  city: rows[0].city,
                  postalCode: rows[0].postalCode,
                },
                documents: {
                  four82: rows[0].four82,
                  PCR: rows[0].PCR,
                  CPR: rows[0].CPR,
                  CrowdControl: rows[0].CrowdControl,
                  License: rows[0].License,
                  Firearms: rows[0].Firearms,
                  FirstAid: rows[0].FirstAid,
                  MediCare: rows[0].MediCare,
                  Passport: rows[0].Passport,
                  ResponsibleAlcohol: rows[0].ResponsibleAlcohol,
                  Visa: rows[0].Visa,
                  WhiteCard: rows[0].WhiteCard,
                  YellowCard: rows[0].YellowCard,
                  WorkingWithChildren: rows[0].WorkingWithChildren,
                },
                otherDocs: {
                  name: rows[0].name,
                  document: rows[0].document,
                },
                bank: {
                  bankName: rows[0].bankName,
                  accountTitle: rows[0].accountTitle,
                  accountNo: rows[0].accountNo,
                  bsb: rows[0].bsb,
                  abn: rows[0].abn,
                },
                schedule: [
                  {
                    shiftStartTime: rows[0].startTime,
                    shiftEndTime: rows[0].endTime,
                    shiftDate: rows[0].date,
                  },
                ],
              },
              accessToken,
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