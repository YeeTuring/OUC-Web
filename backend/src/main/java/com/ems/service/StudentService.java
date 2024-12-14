package com.ems.service;

import com.ems.entity.Student;
import com.ems.mapper.StudentMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.annotation.Resource;
import java.util.List;

@Service
public class StudentService {
    @Resource
    private StudentMapper studentMapper;
    public void add(Student student){
        //进行逻辑业务处理
        Student dbstudent = studentMapper.selectByUsername(student.getUsername());
        if (ObjectUtils.isEmpty(student.getPassword())){
            student.setPassword("123456");
        }
        student.setRole("student");
        student.setScore(0);
        studentMapper.insert(student);


    }
    public PageInfo<Student>selectPage(Student student,Integer pageNum,Integer pagesize)
    {
        List<Student> list;
        PageHelper.startPage(pageNum,pagesize);
        if (!ObjectUtils.isEmpty(student.getName())) {
            list = studentMapper.selectByName(student.getName());
        } else {
            list = studentMapper.selectAll();
        }
        return  PageInfo.of(list);


    }
    public void  updateById(Student student){
        studentMapper.updateById(student);
    }
    public void deleteById(Integer id){
        studentMapper.deleteById(id);
    }

}
