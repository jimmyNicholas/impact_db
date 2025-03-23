import os
from docxtpl import DocxTemplate

current_dir = os.path.dirname(os.path.abspath(__file__))
template_path = os.path.join(current_dir, "templates", "test_1.docx")

def export_docx():
    doc = DocxTemplate(template_path)
    output_dir = os.path.join(current_dir, "generated")
    os.makedirs(output_dir, exist_ok=True)
    context = { 'company_name' : "Word company" }
    doc.render(context)
    output_file = os.path.join(output_dir, "generated_doc.docx")
    doc.save(output_file)
    return output_file