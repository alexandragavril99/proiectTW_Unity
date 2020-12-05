
import Sequelize from "sequelize"

export const sequelize=new Sequelize(
    "database1", "sa2", "sa",{  //al p-4lea  este un obiect
        host:"localhost",  
        dialect:"mssql",
        dialectOptions:{ //optiuni de dialect -> care este un obiect
            option:{ //configurare la baza de date
                trustedConnection:true,
                enableArithAbort:true
            }
        }
    }
);




//module.exports = sequelize
