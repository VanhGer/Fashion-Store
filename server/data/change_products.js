const fs = require('fs');
const path = require('path');

const productFilePath = path.join(__dirname, 'products_2.js');


const sneaker_des = [
    "Giày còn mới, chưa được sử dụng hoặc chỉ rất ít lần. Đế giày chưa có dấu hiệu mòn, không có bất kỳ vết trầy xước hay vết bẩn nào. Bao bì và phụ kiện kèm theo (nếu có) vẫn còn nguyên vẹn.",
    "Giày đã được sử dụng rất ít lần, nhìn gần như mới. Đế giày có thể có chút dấu hiệu mòn rất nhẹ, nhưng gần như không thấy rõ. Bề mặt giày không có vết trầy xước hoặc vết bẩn đáng kể, chỉ có vài dấu hiệu nhẹ từ việc sử dụng.",
    "Giày đã được sử dụng nhưng vẫn còn rất tốt. Đế giày có dấu hiệu mòn nhẹ, nhưng vẫn đảm bảo chất lượng sử dụng. Bề mặt giày có thể có vài vết xước hoặc vết bẩn nhỏ, nhưng không ảnh hưởng đến hình thức chung.",
    "Giày đã qua một số lần sử dụng rõ rệt, có dấu hiệu hao mòn cả ở đế và bề mặt. Đế giày có thể mòn ở một số chỗ, nhưng vẫn còn đủ độ bám để sử dụng. Bề mặt giày có thể có các vết trầy xước rõ hơn hoặc vài vết bẩn, nhưng tổng thể vẫn chấp nhận được.",
    "Giày đã được sử dụng nhiều, có dấu hiệu mòn rõ ràng. Đế giày có thể mòn nhiều hơn, độ bám giảm so với lúc mới. Bề mặt giày có nhiều vết xước hoặc vết bẩn, có thể có các khuyết điểm như bong tróc nhỏ, nhưng không ảnh hưởng lớn đến khả năng sử dụng."
];
const dress_des = [
    "Váy còn mới, chưa được mặc hoặc chỉ rất ít lần. Vải vẫn còn nguyên nếp, không có dấu hiệu giặt hoặc sử dụng. Màu sắc và họa tiết hoàn toàn tươi mới, không có bất kỳ vết bẩn hay hư hỏng nào.",
    "Váy đã được mặc rất ít lần, trông gần như mới. Vải vẫn còn nguyên vẹn, không có dấu hiệu giãn, nhão hay phai màu. Một số nếp nhăn nhẹ có thể xuất hiện nhưng không đáng kể.",
    "Váy đã được mặc vài lần nhưng vẫn còn trong tình trạng tốt. Vải có thể hơi giãn hoặc nhăn ở một vài chỗ, nhưng màu sắc và họa tiết vẫn còn sắc nét. Có thể có những dấu hiệu nhỏ của việc giặt nhưng không ảnh hưởng đến thẩm mỹ.",
    "Váy đã qua một số lần sử dụng rõ rệt. Vải có thể bắt đầu có dấu hiệu giãn nhẹ ở những vùng sử dụng nhiều. Có thể có một số vết nhăn hoặc dấu hiệu phai màu nhẹ, nhưng tổng thể vẫn còn tốt và chấp nhận được.",
    "Váy đã được mặc nhiều lần, có dấu hiệu sử dụng rõ ràng. Vải có thể bị giãn hoặc phai màu ở một số chỗ, có thể xuất hiện những vết nhăn nhiều hơn. Một số khuyết điểm nhỏ như sờn vải hoặc đường may có thể bị ảnh hưởng, nhưng vẫn còn dùng tốt."
];
const shirts_des = [
    "Áo sơ mi còn rất mới, chưa được mặc hoặc chỉ rất ít lần. Vải vẫn còn sắc sảo, không có nếp nhăn hay dấu hiệu giặt. Màu sắc tươi mới, không có bất kỳ vết bẩn hay sờn rách nào.",
    "Áo đã được mặc rất ít lần, trông gần như mới. Vải vẫn còn giữ được độ cứng, không bị giãn hoặc sờn. Có thể có vài nếp nhăn nhỏ nhưng không đáng chú ý.",
    "Áo đã được mặc vài lần nhưng còn giữ tình trạng tốt. Vải có thể hơi mềm hoặc giãn ở một số khu vực. Màu sắc vẫn còn rõ nét, chỉ có những dấu hiệu nhỏ của việc giặt hoặc sử dụng.",
    "Áo đã được sử dụng rõ rệt. Vải có dấu hiệu mềm hoặc giãn ra ở những chỗ cọ xát nhiều như cổ áo hoặc tay áo. Màu sắc có thể hơi phai hoặc nhạt hơn một chút, với một vài nếp nhăn khó là.",
    "Áo đã được mặc nhiều lần, có dấu hiệu hao mòn rõ ràng. Vải có thể bị giãn hoặc sờn ở một số khu vực. Màu sắc có thể phai rõ rệt, và có thể có những vết nhăn hoặc sờn không thể khắc phục hoàn toàn."
];
const jh_des = [
    "Áo chưa được mặc hoặc chỉ mới thử qua. Vải nỉ hoặc cotton còn nguyên độ mềm mịn, không có vết nhăn hay dấu hiệu giặt. Màu sắc tươi sáng, không có dấu hiệu phai màu hay sờn rách. Dây kéo hoặc mũ còn nguyên vẹn.",
    "Áo đã được mặc rất ít lần, gần như mới. Vải vẫn còn mềm mại, giữ form tốt. Màu sắc vẫn tươi sáng, không có vết sờn hay phai màu. Có thể có vài nếp nhăn nhẹ nhưng không đáng kể. Dây kéo và mũ hoạt động tốt.",
    "Áo đã qua vài lần sử dụng nhưng vẫn trong tình trạng tốt. Vải có thể hơi mềm hoặc giãn nhẹ ở một số khu vực, nhưng vẫn giữ được hình dáng ban đầu. Màu sắc có thể nhạt đi một chút, nhưng không ảnh hưởng nhiều. Dây kéo và mũ vẫn sử dụng tốt.",
    "Áo đã qua nhiều lần mặc, với vải bắt đầu giãn hoặc sờn ở cổ, tay áo, hoặc đáy áo. Màu sắc có thể phai nhẹ hoặc nhạt hơn, và vải có thể nhăn nhiều hơn. Dây kéo hoặc mũ có thể hơi lỏng nhưng vẫn còn dùng được.",
    "Áo đã được sử dụng nhiều lần, có dấu hiệu hao mòn rõ rệt. Vải bị giãn hoặc sờn rõ ở nhiều chỗ. Màu sắc phai rõ ràng, có thể xuất hiện các vết nhăn hoặc sờn khó khắc phục. Dây kéo hoặc mũ có thể không còn hoạt động hoàn hảo."
];
const trousers_des = [
    "Quần còn rất mới, chưa được mặc hoặc mặc rất ít lần. Chất liệu vải vẫn còn nguyên độ căng, không có dấu hiệu giãn, nhăn, hay phai màu. Các chi tiết như khóa kéo, nút bấm, và đường may vẫn chắc chắn và mới nguyên.",
    "Quần đã được mặc ít lần, trông gần như mới. Vải vẫn giữ độ căng, không bị giãn hoặc phai màu. Có thể có vài nếp nhăn nhỏ nhưng không đáng kể. Khóa kéo và nút vẫn hoạt động tốt, đường may còn chắc chắn.",
    "Quần đã qua vài lần sử dụng nhưng vẫn còn tốt. Vải có thể bắt đầu mềm đi một chút hoặc có dấu hiệu giãn nhẹ ở một số khu vực (như gối, eo), nhưng màu sắc vẫn ổn định. Khóa kéo và nút vẫn chắc chắn, đường may không có dấu hiệu hỏng hóc.",
    "Quần đã được sử dụng nhiều lần, với chất liệu vải có thể bắt đầu giãn hoặc phai nhẹ ở một số chỗ như gối hoặc hông. Có thể xuất hiện một số vết nhăn hoặc dấu hiệu mòn, nhưng tổng thể vẫn sử dụng được. Khóa kéo và nút vẫn dùng ổn nhưng có thể hơi lỏng.",
    "Quần đã qua nhiều lần sử dụng, có dấu hiệu hao mòn rõ ràng. Vải có thể bị giãn nhiều ở các khu vực chịu áp lực như gối và eo. Màu sắc có thể phai đi đáng kể, với nhiều nếp nhăn không thể khắc phục. Khóa kéo hoặc nút có thể không còn hoạt động hoàn hảo, và đường may có thể yếu đi hoặc bắt đầu bung ra."
];
let products = require('./products_2');

const updatedProducts = products.map(product => {
    // let d = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
    // product.con = d;
    let d = product.con;
    if (d > 97) {
        if (product.category == "Sneakers") {
            product.description = sneaker_des[0];
        } else if (product.category == "dresses") {
            product.description = dress_des[0];
        } else if (product.category == "shirts") {
            product.description = shirts_des[0];
        } else if (product.category == "jackets and hoodies") {
            product.description = jh_des[0];
        } else if (product.category == "trousers") {
            product.description = trousers_des[0];
        }
    } else if (d > 94) {
        if (product.category == "Sneakers") {
            product.description = sneaker_des[1];
        } else if (product.category == "dresses") {
            product.description = dress_des[1];
        } else if (product.category == "shirts") {
            product.description = shirts_des[1];
        } else if (product.category == "jackets and hoodies") {
            product.description = jh_des[1];
        } else if (product.category == "trousers") {
            product.description = trousers_des[1];
        }
    } else if (d > 89) {
        if (product.category == "Sneakers") {
            product.description = sneaker_des[2];
        } else if (product.category == "dresses") {
            product.description = dress_des[2];
        } else if (product.category == "shirts") {
            product.description = shirts_des[2];
        } else if (product.category == "jackets and hoodies") {
            product.description = jh_des[2];
        } else if (product.category == "trousers") {
            product.description = trousers_des[2];
        }
    } else if (d > 84) {
        if (product.category == "Sneakers") {
            product.description = sneaker_des[3];
        } else if (product.category == "dresses") {
            product.description = dress_des[3];
        } else if (product.category == "shirts") {
            product.description = shirts_des[3];
        } else if (product.category == "jackets and hoodies") {
            product.description = jh_des[3];
        } else if (product.category == "trousers") {
            product.description = trousers_des[3];
        }
    } else {
        if (product.category == "Sneakers") {
            product.description = sneaker_des[4];
        } else if (product.category == "dresses") {
            product.description = dress_des[4];
        } else if (product.category == "shirts") {
            product.description = shirts_des[4];
        } else if (product.category == "jackets and hoodies") {
            product.description = jh_des[4];
        } else if (product.category == "trousers") {
            product.description = trousers_des[4];
        }
    }
    return product;
});




const newContent = `const products = ${JSON.stringify(updatedProducts, null, 4)};\n\nmodule.exports = products;\n`;

fs.writeFile(productFilePath, newContent, 'utf-8', (err) => {
    if (err) {
        console.error('Error writing to product.js:', err);
        return;
    }
    console.log('Successfully updated product.js with random "con" values.');
});

