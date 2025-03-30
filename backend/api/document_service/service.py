import os
from docxtpl import DocxTemplate

current_dir = os.path.dirname(os.path.abspath(__file__))
file_name = "ROR_template.docx"
template_path = os.path.join(current_dir, "templates", file_name)

def export_docx(context):
    doc = DocxTemplate(template_path)
    output_dir = os.path.join(current_dir, "generated")
    os.makedirs(output_dir, exist_ok=True)
    doc.render(context)
    output_file = os.path.join(output_dir, file_name)
    doc.save(output_file)
    print(output_file)
    return output_file